import moment, { Moment } from "moment";

export function getNextDate(dayOfMonth: number): Moment {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Check if the day of the month provided is a valid day
  if (dayOfMonth < 1 || dayOfMonth > 31) {
    throw "Invalid day of the month";
  }

  let nextDate: Date;

  // Check if the given day has already passed or is today
  if (dayOfMonth < currentDay) {
    // If current month is December, wrap to January of the next year
    if (currentMonth === 11) {
      nextDate = new Date(currentYear + 1, 0, dayOfMonth);
    } else {
      nextDate = new Date(currentYear, currentMonth + 1, dayOfMonth);
    }
  } else {
    // The given day is still upcoming in the current month
    nextDate = new Date(currentYear, currentMonth, dayOfMonth);
  }

  // Return the next date in the format "Month day, Year"
  return moment(nextDate.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}));
}
