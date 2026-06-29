import { useEffect, useMemo, useState } from "react";
import { generateDatesForFilter } from "../services/dateFiltersService";

function getItemsPerPage(screenWidth: number) {
  switch (true) {
    case screenWidth < 580:
      return 2;

    case screenWidth < 768:
      return 3;

    case screenWidth < 1024:
      return 4;

    default:
      return 6;
  }
}

export function useDateFilter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateFilterPerPage, setDateFilterPerPage] = useState(6);

  const dates = generateDatesForFilter();

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
      setDateFilterPerPage(getItemsPerPage(window.innerWidth));
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
    handleNextDateFilter,
    handlePreviousDateFilter,
  };
}