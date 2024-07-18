"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "../styles.css";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";

export default function Calendar() {
  const [squares, setSquares] = useState([]);
  const [dragSize, setDragSize] = useState(1000); // Initial dragSize
  const swiperRef = useRef(null); // Ref to Swiper instance

  useEffect(() => {
    const generateDaysOfYear = () => {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      const days = [];

      // Start from the current month
      for (
        let monthIndex = currentMonth;
        monthIndex < months.length;
        monthIndex++
      ) {
        // Start from the current day if in the current month, otherwise from 1st
        const startDay = monthIndex === currentMonth ? currentDay : 1;

        for (let day = startDay; day <= daysInMonth[monthIndex]; day++) {
          days.push({ month: months[monthIndex], day });
        }
      }

      // Wrap around to the beginning of the year for the months before the current month
      for (let monthIndex = 0; monthIndex < currentMonth; monthIndex++) {
        for (let day = 1; day <= daysInMonth[monthIndex]; day++) {
          days.push({ month: months[monthIndex], day });
        }
      }

      return days;
    };

    const days = generateDaysOfYear();
    setSquares(days); // Update squares state here
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideNextTransitionStart", handleNext);
      swiperInstance.on("slidePrevTransitionStart", handlePrev);
    }
  }); // Run when swiperRef changes

  const handleNext = () => {
    adjustDragSize("next");
  };

  const handlePrev = () => {
    adjustDragSize("prev");
  };

  const adjustDragSize = (direction) => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      let newDragSize = dragSize;

      // Adjust dragSize based on direction
      if (direction === "next") {
        newDragSize -= 3; // Decrease dragSize for next
      } else if (direction === "prev") {
        newDragSize += 3; // Increase dragSize for prev
      }

      setDragSize(newDragSize); // Update state for dragSize
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 9,
        renderBullet: (index, className) =>
          `<span class="${className}">${squares[index]?.month}<br/>${squares[index]?.day}</span>`,
      }}
      slidesPerView={1}
      spaceBetween={30}
      scrollbar={{
        hide: false,
        enabled: true,
        draggable: true,
        dragSize: dragSize, // Initial dragSize
      }}
      navigation={true}
      modules={[Navigation, Scrollbar, Pagination]}
      className="mySwiper"
    >
      {squares.map((square, idx) => (
        <SwiperSlide key={idx}>
          <div className="square-content">
            <span>{square?.month}</span>&nbsp;
            <span>{square?.day}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
