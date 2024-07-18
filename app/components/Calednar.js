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
  const [dragSize, setDragSize] = useState(1000);
  const swiperRef = useRef(null); // Ref to Swiper instance

  useEffect(() => {
    const generateDaysOfYear = () => {
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
      months.forEach((month, monthIndex) => {
        for (let day = 1; day <= daysInMonth[monthIndex]; day++) {
          days.push({ month, day });
        }
      });
      return days;
    };

    const days = generateDaysOfYear();
    setSquares(days); // Update squares state here
  }, []); // Empty dependency array ensures useEffect runs only once

  // Function to handle navigation button clicks

  const handleNavigationClick = (direction) => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      const currentDragSize = swiperInstance.scrollbar.dragSize;
      let newDragSize = currentDragSize;

      // Adjust dragSize based on direction
      if (direction === "next") {
        newDragSize -= 100; // Decrease dragSize for next
      } else if (direction === "prev") {
        newDragSize += 100; // Increase dragSize for prev
      }

      // Update swiper scrollbar with new dragSize
      swiperInstance.scrollbar.updateSize(100);
      setDragSize(100);
      console.log(swiperInstance.scrollbar);
    }
  };

  return (
    <>
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

      {/* Next and Prev navigation buttons */}
    </>
  );
}
