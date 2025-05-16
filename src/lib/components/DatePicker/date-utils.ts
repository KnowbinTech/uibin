import type { DateFormatFunction } from './types.js';

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is between two other dates
 */
export function isDateInRange(date: Date, startDate: Date | null, endDate: Date | null): boolean {
  if (!startDate || !endDate) return false;
  
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Check if a date is disabled
 */
export function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean {
  // Check if date is outside min/max range
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  
  // Check if date is in the disabled dates array
  if (disabledDates && disabledDates.some(disabledDate => isSameDay(date, disabledDate))) {
    return true;
  }
  
  return false;
}

/**
 * Check if a date is highlighted
 */
export function isDateHighlighted(date: Date, highlightedDates?: Date[]): boolean {
  if (!highlightedDates || !highlightedDates.length) return false;
  
  return highlightedDates.some(highlightedDate => isSameDay(date, highlightedDate));
}

/**
 * Get the day names for a given locale
 */
export function getDayNames(locale: string = 'en-US', format: 'long' | 'short' | 'narrow' = 'short'): string[] {
  const days = [];
  const date = new Date(2021, 0, 3); // Use a Sunday as a starting point
  
  for (let i = 0; i < 7; i++) {
    days.push(date.toLocaleDateString(locale, { weekday: format }));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
}

/**
 * Get month names for a given locale
 */
export function getMonthNames(locale: string = 'en-US', format: 'long' | 'short' | 'narrow' = 'long'): string[] {
  const months = [];
  const date = new Date(2021, 0, 1);
  
  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    months.push(date.toLocaleDateString(locale, { month: format }));
  }
  
  return months;
}

/**
 * Generate date grid for a month
 */
export function generateMonthDays(
  year: number,
  month: number,
  firstDayOfWeek: number = 0
): Date[] {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Calculate the start date (may be from the previous month)
  let startDate = new Date(firstDay);
  const firstDayWeekDay = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
  startDate.setDate(startDate.getDate() - firstDayWeekDay);
  
  // Generate a 6-row calendar to ensure consistency
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    days.push(date);
    startDate.setDate(startDate.getDate() + 1);
  }
  
  return days;
}

/**
 * Generate a list of years for the year selector
 */
export function generateYearRange(centerYear: number, range: number = 10): number[] {
  const years = [];
  const startYear = centerYear - range;
  const endYear = centerYear + range;
  
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  
  return years;
}

/**
 * Format a date according to a format string
 * Supported tokens:
 * - yyyy: full year (2021)
 * - yy: short year (21)
 * - MMMM: full month name (January)
 * - MMM: short month name (Jan)
 * - MM: month number with leading zero (01-12)
 * - M: month number (1-12)
 * - dd: day of month with leading zero (01-31)
 * - d: day of month (1-31)
 * - EEEE: full weekday name (Monday)
 * - EEE: short weekday name (Mon)
 * - E: short weekday name (M)
 */
export function formatDate(date: Date | null, format: string | DateFormatFunction): string {
  if (!date) return '';
  
  if (typeof format === 'function') {
    return format(date);
  }
  
  const tokens: Record<string, () => string> = {
    yyyy: () => date.getFullYear().toString(),
    yy: () => date.getFullYear().toString().slice(2),
    MMMM: () => date.toLocaleDateString(undefined, { month: 'long' }),
    MMM: () => date.toLocaleDateString(undefined, { month: 'short' }),
    MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
    M: () => (date.getMonth() + 1).toString(),
    dd: () => date.getDate().toString().padStart(2, '0'),
    d: () => date.getDate().toString(),
    EEEE: () => date.toLocaleDateString(undefined, { weekday: 'long' }),
    EEE: () => date.toLocaleDateString(undefined, { weekday: 'short' }),
    E: () => date.toLocaleDateString(undefined, { weekday: 'narrow' }),
  };
  
  // Replace tokens in the format string
  return format.replace(
    /(yyyy|yy|MMMM|MMM|MM|M|dd|d|EEEE|EEE|E)/g,
    match => tokens[match]?.() || match
  );
}

/**
 * Parse a date string into a Date object
 * Supported formats:
 * - yyyy-MM-dd
 * - MM/dd/yyyy
 * - dd.MM.yyyy
 */
export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  // Try ISO format (yyyy-MM-dd)
  let match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    const [_, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  // Try US format (MM/dd/yyyy)
  match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [_, month, day, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  // Try European format (dd.MM.yyyy)
  match = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (match) {
    const [_, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  // If no format matches, return null
  return null;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Create a date with time set to the beginning of the day
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Create a date with time set to the end of the day
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Create a date set to the start of a month
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Create a date set to the end of a month
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get week number for a date
 */
export function getWeekNumber(date: Date): number {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const week1 = new Date(target.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((target.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
} 