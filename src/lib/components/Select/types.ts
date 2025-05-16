import type { HTMLSelectAttributes } from 'svelte/elements';

export type SelectSize = 
  | 'sm'
  | 'md'
  | 'lg';

export type SelectVariant = 
  | 'default'
  | 'filled'
  | 'outline'
  | 'flushed';

export interface SelectOption {
  /**
   * Option value - what gets submitted in the form
   */
  value: string;
  
  /**
   * Option label - what's displayed to the user
   */
  label: string;
  
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  
  /**
   * Optional group this option belongs to
   */
  group?: string;
}

/**
 * Select component props interface
 */
export interface SelectProps extends Omit<HTMLSelectAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Helper text displayed below the select
   */
  helperText?: string;
  
  /**
   * Error message displayed below the select
   */
  errorMessage?: string;
  
  /**
   * Select variant
   * @default 'default'
   */
  variant?: SelectVariant;
  
  /**
   * Select size
   * @default 'md'
   */
  size?: SelectSize;
  
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Make the select full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * ID for the select element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Name attribute for the select
   */
  name?: string;
  
  /**
   * Currently selected value
   */
  value?: string;
  
  /**
   * Allow multiple selection
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Placeholder text (displayed as first disabled option)
   */
  placeholder?: string;
  
  /**
   * Icon to display before select text
   */
  leftIcon?: any;
  
  /**
   * Options to display in the select dropdown
   */
  options?: SelectOption[];
} 