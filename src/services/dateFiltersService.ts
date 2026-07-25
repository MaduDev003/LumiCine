interface DateFilter {
  day: string;
  date: number;
  selectedDate?: boolean;
  formattedDate: string;
  sessions: string[];
  fullDate: Date;
}
function generateSessions(index: number) {
  const startHour = 10 + (index % 4);

  return [
    `${startHour}:00 - ${startHour + 1}:30`,
    `${startHour + 2}:00 - ${startHour + 3}:30`,
    `${startHour + 4}:00 - ${startHour + 5}:30`,
    `${startHour + 6}:00 - ${startHour + 7}:30`,
    `${startHour + 8}:00 - ${startHour + 9}:30`,
    `${startHour + 10}:00 - ${startHour + 11}:30`,
  ];
}

export function generateDatesForFilter(days = 15): DateFilter[] {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const today = new Date();

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      day: weekDays[date.getDay()],
      date: date.getDate(),
      formattedDate: `${date.getDate()} de ${months[date.getMonth()]}`,
      selectedDate: false,
      fullDate: date,
      sessions: generateSessions(index),
    };
  });
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