export function GetDayOfWeekAndTime(date: Date) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const day = date.getDay();

  const dayOfWeek = daysOfWeek[day].toLowerCase();

  const hour = date.getHours();

  return { dayOfWeek, hour };
}
