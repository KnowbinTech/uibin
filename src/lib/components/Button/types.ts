import type { HTMLAttributes } from 'svelte/elements';

export type ButtonVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'link'
  | 'outline';

export type ButtonSize = 
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon';

/**
 * Button component props interface
 */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Button variant
   * @default 'default'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to show loading spinner
   * @default false
   */
  loading?: boolean;
  
  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Make the button full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display before button text
   */
  leftIcon?: any;
  
  /**
   * Icon to display after button text
   */
  rightIcon?: any;
  
  /**
   * Use button as link (anchor element)
   */
  href?: string;
  
  /**
   * Target attribute for link buttons
   */
  target?: string;
  
  /**
   * Rel attribute for link buttons
   */
  rel?: string;
  
  /**
   * Button form attribute
   */
  form?: string;
  
  /**
   * Element to render component as
   * @default 'button'
   */
  as?: 'button' | 'a' | 'div' | 'span';
  
  /**
   * Button text content
   * @default ''
   */
  text?: string;
} 