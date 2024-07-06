import moment, { Moment } from "moment";

export function getNextDate(dayOfMonth?: number): Moment | null {
  if (typeof dayOfMonth != 'number') {
    return null;
  }
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

export function isTodayOrTomorrow(date: Date) {
  // Get current date without time part
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today

  // Get tomorrow's date without time part
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set to beginning of tomorrow

  // Convert input date to Date object if it's not already
  const inputDate = new Date(date);

  // Check if inputDate is either today or tomorrow
  return inputDate.getTime() >= today.getTime() && inputDate.getTime() < tomorrow.getTime();
}
