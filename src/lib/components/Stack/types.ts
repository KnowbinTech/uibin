import type { HTMLAttributes } from 'svelte/elements';

/**
 * Stack component props interface
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes to apply to the Stack
   */
  class?: string;
  
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  
  /**
   * Space between items
   * @default 4
   */
  space?: number;
  
  /**
   * Alignment of items when direction is horizontal
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  
  /**
   * Justification of items
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  
  /**
   * Make the stack wrap items when they don't fit
   * @default false in horizontal mode, N/A in vertical
   */
  wrap?: boolean;
  
  /**
   * Reverse the order of items
   * @default false
   */
  reverse?: boolean;
  
  /**
   * Responsive space for small screens
   */
  smSpace?: number;
  
  /**
   * Responsive space for medium screens
   */
  mdSpace?: number;
  
  /**
   * Responsive space for large screens
   */
  lgSpace?: number;
  
  /**
   * Responsive space for extra large screens
   */
  xlSpace?: number;
  
  /**
   * Responsive direction for small screens
   */
  smDirection?: 'vertical' | 'horizontal';
  
  /**
   * Responsive direction for medium screens
   */
  mdDirection?: 'vertical' | 'horizontal';
  
  /**
   * Responsive direction for large screens
   */
  lgDirection?: 'vertical' | 'horizontal';
  
  /**
   * Responsive direction for extra large screens
   */
  xlDirection?: 'vertical' | 'horizontal';
  
  /**
   * Dividers between items
   * @default false
   */
  dividers?: boolean;
} 