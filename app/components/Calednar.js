"use client";
import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const datesContainerRef = useRef(null);

  useEffect(() => {
    const container = datesContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const maxScroll = scrollWidth - clientWidth;

    const scrollRatio = scrollLeft / maxScroll;
    const minLength = 10;
    const maxLength = 50;
    const newLength = maxLength - (maxLength - minLength) * scrollRatio;

    container.style.setProperty("--scrollbar-length", "50%");
    generateDates();
  }, []);

  useEffect(() => {
    if (datesContainerRef.current) {
      scrollToActiveDate();
    }
  }, [activeIndex]);

  const generateDates = () => {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = new Date(today.getFullYear(), 11, 31);

    const datesArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      datesArray.push(
        currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDates(datesArray);
  };

  const setActive = (index) => {
    setActiveIndex(index);
    scrollToActiveDate();
  };

  const prevPage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      scrollToActiveDate();
    }
  };

  const nextPage = () => {
    if (activeIndex < dates.length - 1) {
      setActiveIndex(activeIndex + 1);
      scrollToActiveDate();
    }
  };

  const scrollToActiveDate = () => {
    const container = datesContainerRef.current;
    const activeElement = container.children[activeIndex];

    if (activeElement) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const scrollLeft =
        activeRect.left -
        containerRect.left -
        containerRect.width / 2 +
        activeRect.width / 2;
      container.scrollLeft = scrollLeft;
      updateScrollbarWidth();
    }
  };

  const updateScrollbarWidth = () => {
    const container = datesContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const maxScroll = scrollWidth - clientWidth;

    const scrollRatio = scrollLeft / maxScroll;
    const minLength = 10;
    const maxLength = 50;
    const newLength = maxLength - (maxLength - minLength) * scrollRatio;

    container.style.setProperty("--scrollbar-length", `${newLength}%`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="calendar-container">
      <div className="scroll-buttons">
        <button onClick={prevPage} className="nav-button">
          &lt;
        </button>
        <div
          className="dates-container"
          ref={datesContainerRef}
          onScroll={updateScrollbarWidth}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActive(index)}
            >
              {formatDate(date).split(" ")[0]}

              <br />
              {formatDate(date).split(" ")[1]}
            </div>
          ))}
        </div>
        <button onClick={nextPage} className="nav-button">
          &gt;
        </button>
      </div>
      <div className="selected-date">
        <p>{formatDate(dates[activeIndex])}</p>
      </div>
    </div>
  );
};

export default Calendar;
