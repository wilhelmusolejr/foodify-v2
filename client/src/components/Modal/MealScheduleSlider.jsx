import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import DateCardItem from "@components/mealplanner/DateCardItem";

export default function MealScheduleSlider({ userMealSchedule, selectedISO, changeSelectedDate }) {
  const sliderRef = useRef(null);
  const contentRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (!sliderRef.current || !contentRef.current) return;

    const containerWidth = sliderRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    setDragWidth(contentWidth - containerWidth);
  }, [userMealSchedule]);

  return (
    <div ref={sliderRef} className="overflow-hidden px-2 py-5">
      <motion.div
        ref={contentRef}
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        dragElastic={0.08}
        dragMomentum={true}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          // small timeout allows motion to finish
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 50);
        }}
        className="flex gap-5 cursor-grab active:cursor-grabbing"
      >
        {userMealSchedule.map((item) => (
          <DateCardItem
            dayName={item.day_type}
            dateLabel={item.date}
            meals={item.meal}
            isoDate={item.iso}
            selectedISO={selectedISO}
            onClick={() => {
              if (isDraggingRef.current) return;
              changeSelectedDate(item.iso);
            }}
          />
        ))}

        <div className="min-w-4" />
      </motion.div>
    </div>
  );
}
