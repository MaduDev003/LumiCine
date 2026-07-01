interface DateFilter {
  day: string;
  date: number;
  selectedDate?: boolean;
  fullDate: Date;
}

export function generateDatesForFilter(): DateFilter[] {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const firstDay = new Date();
  const lastDay = new Date(firstDay);
  lastDay.setMonth(lastDay.getMonth() + 2);

  const filterDates: DateFilter[] = [];
  const currentDay = new Date(firstDay);

  while (currentDay.getTime() <= lastDay.getTime()) {
    filterDates.push({
      day: weekDays[currentDay.getDay()],
      date: currentDay.getDate(),
      selectedDate: true,
      fullDate: new Date(currentDay)
    });

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return filterDates;
}

export function generateMoviePeriod(release_date: string) {
  const startDate = new Date(release_date);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 4);

  return {
    start_date: startDate,
    end_date: endDate,
  };
}