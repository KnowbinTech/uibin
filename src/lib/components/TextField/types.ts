import type { HTMLInputAttributes } from 'svelte/elements';

export type TextFieldVariant = 
  | 'default'
  | 'filled'
  | 'outline'
  | 'flushed';

export type TextFieldSize = 
  | 'sm'
  | 'md'
  | 'lg';

/**
 * TextField component props interface
 */
export interface TextFieldProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  
  /**
   * Error message displayed below the input
   */
  errorMessage?: string;
  
  /**
   * Input variant
   * @default 'default'
   */
  variant?: TextFieldVariant;
  
  /**
   * Input size
   * @default 'md'
   */
  size?: TextFieldSize;
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Whether the input is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Make the input full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display before input text
   */
  leftIcon?: any;
  
  /**
   * Icon to display after input text
   */
  rightIcon?: any;
  
  /**
   * ID for the input element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Make the input read-only
   * @default false
   */
  readonly?: boolean;
  
  /**
   * Add a clear button to the input
   * @default false
   */
  clearable?: boolean;
  
  /**
   * Input name attribute
   */
  name?: string;
  
  /**
   * Input value
   */
  value?: string;
  
  /**
   * Input type attribute
   * @default 'text'
   */
  type?: string;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
} 