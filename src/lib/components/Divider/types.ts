import type { HTMLAttributes } from 'svelte/elements';

export type DividerOrientation = 
  | 'horizontal'
  | 'vertical';

export type DividerWeight = 
  | 'thin'
  | 'medium'
  | 'thick';

/**
 * Divider component props interface
 */
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * Custom CSS classes
   */
  class?: string;
  
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  
  /**
   * Divider weight
   * @default 'medium'
   */
  weight?: DividerWeight;
  
  /**
   * Whether the divider has a label
   * @default false
   */
  withLabel?: boolean;
  
  /**
   * Custom color for the divider
   */
  color?: string;
  
  /**
   * Decorative style for the divider
   * @default 'solid'
   */
  style?: 'solid' | 'dashed' | 'dotted';
} 