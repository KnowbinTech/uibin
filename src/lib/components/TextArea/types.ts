import type { HTMLTextareaAttributes } from 'svelte/elements';

export type TextAreaVariant = 
  | 'default'
  | 'filled'
  | 'outline'
  | 'flushed';

export type TextAreaSize = 
  | 'sm'
  | 'md'
  | 'lg';

/**
 * TextArea component props interface
 */
export interface TextAreaProps extends Omit<HTMLTextareaAttributes, 'size'> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  
  /**
   * Error message displayed below the textarea
   */
  errorMessage?: string;
  
  /**
   * Textarea variant
   * @default 'default'
   */
  variant?: TextAreaVariant;
  
  /**
   * Textarea size
   * @default 'md'
   */
  size?: TextAreaSize;
  
  /**
   * Whether the textarea is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the textarea is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Whether the textarea is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Make the textarea full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * ID for the textarea element
   * This is auto-generated if not provided
   */
  id?: string;
  
  /**
   * Make the textarea read-only
   * @default false
   */
  readonly?: boolean;
  
  /**
   * Add a clear button to the textarea
   * @default false
   */
  clearable?: boolean;
  
  /**
   * Textarea name attribute
   */
  name?: string;
  
  /**
   * Textarea value
   */
  value?: string;
  
  /**
   * Textarea placeholder
   */
  placeholder?: string;
  
  /**
   * Number of rows for the textarea
   * @default 3
   */
  rows?: number;
  
  /**
   * Maximum number of rows (used with autoResize)
   * @default Infinity
   */
  maxRows?: number;
  
  /**
   * Auto-resize textarea based on content
   * @default false
   */
  autoResize?: boolean;
  
  /**
   * Maximum character count
   */
  maxLength?: number;
  
  /**
   * Show character count
   * @default false
   */
  showCount?: boolean;
} 