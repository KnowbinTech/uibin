import type { HTMLAttributes } from 'svelte/elements';

/**
 * Button group alignment options
 */
export type ButtonGroupAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Button group spacing options
 */
export type ButtonGroupSpacing = 'default' | 'compact' | 'loose' | 'none';

/**
 * ButtonGroup component props interface
 */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Direction of the button group
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * Alignment of the buttons within the group
   * @default 'start'
   */
  align?: ButtonGroupAlignment;
  
  /**
   * Spacing between buttons
   * @default 'default'
   */
  spacing?: ButtonGroupSpacing;
  
  /**
   * Full width mode (expands to container width)
   * @default false
   */
  fullWidth?: boolean;
} 