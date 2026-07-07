import { useEffect, useMemo, useState } from "react";
import { generateDatesForFilter } from "../services/dateFiltersService";

export function getItemsPerPage(
  screenWidth: number,
  type: "home" | "session"
) {
  switch (type) {
    case "home":
      switch (true) {
        case screenWidth < 580:
          return 1;
        case screenWidth < 768:
          return 3;
        case screenWidth < 1024:
          return 4;
        default:
          return 6;
      }

    case "session":
      switch (true) {
        case screenWidth < 580:
          return 1;
        case screenWidth < 1024:
          return 2;
        default:
          return 3;
      }
  }
}

export function useDateFilter(days = 15, type: "home" | "session") {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateFilterPerPage, setDateFilterPerPage] = useState(6);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dates = useMemo(() => generateDatesForFilter(days), [days]);

  const visibleDates = dates.slice(
    currentIndex,
    currentIndex + dateFilterPerPage
  );

  const nextIndex = currentIndex + dateFilterPerPage;
  const previousIndex = currentIndex - dateFilterPerPage;

  const hasNext = !!dates[nextIndex];
  const hasPrevious = previousIndex >= 0;

  function handleNextDateFilter() {
    if (hasNext) {
      setCurrentIndex(nextIndex);
    }
  }

  function handlePreviousDateFilter() {
    if (hasPrevious) {
      setCurrentIndex(previousIndex);
    }
  }

  useEffect(() => {
    function updateItemsPerPage() {
      setDateFilterPerPage(getItemsPerPage(window.innerWidth, type));
    }

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  return {
    visibleDates,
    hasNext,
    hasPrevious,
    selectedDate,
    setSelectedDate,
    handleNextDateFilter,
    handlePreviousDateFilter,
  };
}