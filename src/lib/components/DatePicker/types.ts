import type { HTMLAttributes } from 'svelte/elements';

export type DatePickerSize = 
  | 'sm'
  | 'md'
  | 'lg';

export type DatePickerVariant = 
  | 'default'
  | 'filled'
  | 'outline'
  | 'flushed';

export type DatePickerView = 
  | 'days'
  | 'months'
  | 'years';

export type DateFormatFunction = (date: Date) => string;

/**
 * Date range interface for range selection mode
 */
export interface DateRange {
  /**
   * Start date of the range
   */
  start: Date | null;
  
  /**
   * End date of the range
   */
  end: Date | null;
}

/**
 * DatePicker component props interface
 */
export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Helper text displayed below the date picker
   */
  helperText?: string;
  
  /**
   * Error message displayed below the date picker
   */
  errorMessage?: string;
  
  /**
   * DatePicker variant
   * @default 'default'
   */
  variant?: DatePickerVariant;
  
  /**
   * DatePicker size
   * @default 'md'
   */
  size?: DatePickerSize;
  
  /**
   * Whether the date picker is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the date picker is required
   * @default false
   */
  required?: boolean;
  
  /**
   * ID for the date picker element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the input field
   */
  name?: string;
  
  /**
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string;
  
  /**
   * Selected date
   */
  value?: Date | null;
  
  /**
   * Selected date range (for range mode)
   */
  range?: boolean;
  
  /**
   * Selected date range value (for range mode)
   */
  rangeValue?: DateRange;
  
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  
  /**
   * Format for displaying the date in the input
   * @default 'yyyy-MM-dd'
   */
  dateFormat?: string | DateFormatFunction;
  
  /**
   * Format for displaying month and year in calendar header
   * @default 'MMMM yyyy'
   */
  headerFormat?: string | DateFormatFunction;
  
  /**
   * Days to highlight (e.g., holidays)
   */
  highlightedDates?: Date[];
  
  /**
   * Days to disable (e.g., weekends or specific dates)
   */
  disabledDates?: Date[];
  
  /**
   * Whether to close the calendar when a date is selected
   * @default true
   */
  closeOnSelect?: boolean;
  
  /**
   * Default view when opening the calendar
   * @default 'days'
   */
  defaultView?: DatePickerView;
  
  /**
   * Allow date range selection
   * @default false
   */
  rangeSelection?: boolean;
  
  /**
   * Make the date picker full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Show clear button to reset date selection
   * @default false
   */
  clearable?: boolean;
  
  /**
   * Localization options for day and month names
   */
  locale?: string;
  
  /**
   * First day of the week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  firstDayOfWeek?: number;
  
  /**
   * Icon to display at the start of the input
   */
  leftIcon?: any;
  
  /**
   * Position of the calendar dropdown
   * @default 'bottom'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Show today button for quick selection
   * @default false
   */
  showTodayButton?: boolean;
  
  /**
   * Show month and year dropdowns for quick navigation
   * @default false
   */
  showMonthYearDropdowns?: boolean;
  
  /**
   * Show week numbers in calendar
   * @default false
   */
  showWeekNumbers?: boolean;
} 