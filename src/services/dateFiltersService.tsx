interface DateFilter {
  day: string;
  date: number;
  selectedDate: boolean;
}

export function generateDatesForFilter(): DateFilter[] {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const firstDay = new Date();
  const lastDay = new Date(firstDay);
  lastDay.setMonth(lastDay.getMonth() + 3);

  const filterDates: DateFilter[] = [];
  const currentDay = new Date(firstDay);

  while (currentDay.getTime() <= lastDay.getTime()) {
    filterDates.push({
      day: weekDays[currentDay.getDay()],
      date: currentDay.getDate(),
      selectedDate: filterDates.length === 0,
    });

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return filterDates;
}
