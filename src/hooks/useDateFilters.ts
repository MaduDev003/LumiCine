import { useEffect, useMemo, useState } from "react";
import { generateDatesForFilter } from "@/src/services/dateFiltersService";
import {renderItemsPerPage} from "@/src/utils/renderItensPerPage";

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
      setDateFilterPerPage(renderItemsPerPage(window.innerWidth, type));
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