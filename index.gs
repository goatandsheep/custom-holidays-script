function createRelativeHolidays() {
  // 1. Get your primary calendar (or replace with a specific calendar ID)
  const calendar = CalendarApp.getDefaultCalendar();
  
  // Define the range of years you want to generate holidays for
  const startYear = 2026;
  const endYear = 2035;
  
  for (let year = startYear; year <= endYear; year++) {
    // 2. Calculate the exact date for your relative holiday
    // Example: Thanksgiving is the 4th Thursday in November
    const thanksgivingDate = getRelativeDate(year, 10, CalendarApp.Weekday.THURSDAY, 4); // 10 is November (0-indexed)
    
    // 3. Create the all-day event
    calendar.createAllDayEvent("Thanksgiving Day", thanksgivingDate);
    Logger.log("Created Thanksgiving for " + year + " on " + thanksgivingDate.toDateString());
  }
}

/**
 * Calculates a relative date (e.g., 4th Thursday of November)
 * @param {number} year - The year (e.g., 2026)
 * @param {number} month - The month, 0-indexed (0 = Jan, 10 = Nov, 11 = Dec)
 * @param {Weekday} weekday - CalendarApp.Weekday enum
 * @param {number} occurrence - Which occurrence (1 = 1st, 4 = 4th)
 * @return {Date} The calculated date object
 */
function getRelativeDate(year, month, weekday, occurrence) {
  // Target weekday index (0 = Sunday, 1 = Monday, ..., 4 = Thursday, etc.)
  // Mapping Apps Script Weekday Enum to JS getDay() values
  const weekdayMap = {};
  weekdayMap[CalendarApp.Weekday.SUNDAY] = 0;
  weekdayMap[CalendarApp.Weekday.MONDAY] = 1;
  weekdayMap[CalendarApp.Weekday.TUESDAY] = 2;
  weekdayMap[CalendarApp.Weekday.WEDNESDAY] = 3;
  weekdayMap[CalendarApp.Weekday.THURSDAY] = 4;
  weekdayMap[CalendarApp.Weekday.FRIDAY] = 5;
  weekdayMap[CalendarApp.Weekday.SATURDAY] = 6;
  
  const targetDay = weekdayMap[weekday];
  let count = 0;
  
  // Start loop from the 1st day of the month
  for (let day = 1; day <= 31; day++) {
    let date = new Date(year, month, day);
    
    // Break if we've accidentally rolled over into the next month
    if (date.getMonth() !== month) break;
    
    if (date.getDay() === targetDay) {
      count++;
      if (count === occurrence) {
        return date;
      }
    }
  }
  return null;
}