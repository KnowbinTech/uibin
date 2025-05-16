import type { HTMLInputAttributes } from 'svelte/elements';

export type CheckboxSize = 
  | 'sm'
  | 'md'
  | 'lg';

/**
 * Checkbox component props interface
 */
export interface CheckboxProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Checkbox label
   */
  label?: string;
  
  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;
  
  /**
   * Error message displayed below the checkbox
   */
  errorMessage?: string;
  
  /**
   * Checkbox size
   * @default 'md'
   */
  size?: CheckboxSize;
  
  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Whether the checkbox is in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * The value attribute of the checkbox
   */
  value?: string;
  
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;
  
  /**
   * ID for the checkbox element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the checkbox
   */
  name?: string;
} 