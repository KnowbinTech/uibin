import type { HTMLAttributes } from 'svelte/elements';

export type SliderSize = 
  | 'sm'
  | 'md'
  | 'lg';

export interface SliderMark {
  /**
   * Value at which to display the mark
   */
  value: number;
  
  /**
   * Optional label to display at the mark
   */
  label?: string;
}

/**
 * Slider component props interface
 */
export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Helper text displayed below the slider
   */
  helperText?: string;
  
  /**
   * Error message displayed below the slider
   */
  errorMessage?: string;
  
  /**
   * Slider size
   * @default 'md'
   */
  size?: SliderSize;
  
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * ID for the slider element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the slider
   */
  name?: string;
  
  /**
   * Current value of the slider
   * @default 0
   */
  value?: number;
  
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  
  /**
   * Step interval
   * @default 1
   */
  step?: number;
  
  /**
   * Make the slider full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Marks to display on the slider
   */
  marks?: SliderMark[];
  
  /**
   * Whether to show the current value
   * @default false
   */
  showValue?: boolean;
  
  /**
   * Whether to show the current value in a tooltip
   * @default false
   */
  showTooltip?: boolean;
  
  /**
   * Custom formatter for the displayed value
   */
  valueFormatter?: (value: number) => string;
  
  /**
   * Enable range selection (two handles)
   * @default false
   */
  range?: boolean;
  
  /**
   * End value (used for range selection)
   * Only used when range is true
   */
  endValue?: number;
  
  /**
   * Color of the slider
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
} 