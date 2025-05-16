import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchSize = 
  | 'sm'
  | 'md'
  | 'lg';

/**
 * Switch component props interface
 */
export interface SwitchProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Switch label
   */
  label?: string;
  
  /**
   * Helper text displayed below the switch
   */
  helperText?: string;
  
  /**
   * Error message displayed below the switch
   */
  errorMessage?: string;
  
  /**
   * Switch size
   * @default 'md'
   */
  size?: SwitchSize;
  
  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the switch is required
   * @default false
   */
  required?: boolean;
  
  /**
   * The value attribute of the switch
   */
  value?: string;
  
  /**
   * Whether the switch is checked/on
   * @default false
   */
  checked?: boolean;
  
  /**
   * ID for the switch element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the switch
   */
  name?: string;
  
  /**
   * Color of the switch when checked
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  /**
   * Position of the label
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
} 