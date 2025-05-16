import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioSize = 
  | 'sm'
  | 'md'
  | 'lg';

/**
 * Radio component props interface
 */
export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Radio label
   */
  label?: string;
  
  /**
   * Helper text displayed below the radio
   */
  helperText?: string;
  
  /**
   * Error message displayed below the radio
   */
  errorMessage?: string;
  
  /**
   * Radio size
   * @default 'md'
   */
  size?: RadioSize;
  
  /**
   * Whether the radio is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the radio is required
   * @default false
   */
  required?: boolean;
  
  /**
   * The value attribute of the radio
   */
  value?: string;
  
  /**
   * Whether the radio is checked
   * @default false
   */
  checked?: boolean;
  
  /**
   * ID for the radio element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the radio
   */
  name?: string;
}

/**
 * Radio group orientation
 */
export type RadioGroupOrientation = 
  | 'horizontal'
  | 'vertical';

/**
 * RadioGroup component props interface
 */
export interface RadioGroupProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * RadioGroup label
   */
  label?: string;
  
  /**
   * Helper text displayed below the radio group
   */
  helperText?: string;
  
  /**
   * Error message displayed below the radio group
   */
  errorMessage?: string;
  
  /**
   * Radio size
   * @default 'md'
   */
  size?: RadioSize;
  
  /**
   * Whether the radio group is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether a selection is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Name attribute for all radios in the group
   */
  name: string;
  
  /**
   * Currently selected value
   */
  value?: string;
  
  /**
   * Orientation of the radio buttons
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation;
  
  /**
   * ID for the radio group element
   * This is auto-generated if not provided
   */
  id?: string;
} 