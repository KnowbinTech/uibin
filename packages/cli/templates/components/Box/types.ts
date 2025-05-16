import type { HTMLAttributes } from 'svelte/elements';

/**
 * Box component props interface
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes to apply to the Box
   */
  class?: string;
  
  /**
   * The HTML element to render for the Box
   * @default 'div'
   */
  as?: keyof HTMLElementTagNameMap;
  
  /**
   * Padding level to apply
   * @example 0 (none), 1 (small), 2 (medium), 3 (large), etc.
   */
  p?: number;
  
  /**
   * Horizontal padding level
   */
  px?: number;
  
  /**
   * Vertical padding level
   */
  py?: number;
  
  /**
   * Top padding level
   */
  pt?: number;
  
  /**
   * Right padding level
   */
  pr?: number;
  
  /**
   * Bottom padding level
   */
  pb?: number;
  
  /**
   * Left padding level
   */
  pl?: number;
  
  /**
   * Margin level to apply
   */
  m?: number;
  
  /**
   * Horizontal margin level
   */
  mx?: number;
  
  /**
   * Vertical margin level
   */
  my?: number;
  
  /**
   * Top margin level
   */
  mt?: number;
  
  /**
   * Right margin level
   */
  mr?: number;
  
  /**
   * Bottom margin level
   */
  mb?: number;
  
  /**
   * Left margin level
   */
  ml?: number;
  
  /**
   * Border radius setting
   * @example 'sm', 'md', 'lg', 'full', etc.
   */
  rounded?: keyof typeof import('../../theme/radius.js') | boolean;
  
  /**
   * Background color token from theme
   */
  bg?: string;
  
  /**
   * Text color token from theme
   */
  color?: string;
  
  /**
   * Whether to apply shadow
   */
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to apply border
   */
  border?: boolean;
} 