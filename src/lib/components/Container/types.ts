import type { HTMLAttributes } from 'svelte/elements';

/**
 * Container component props interface
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes to apply to the Container
   */
  class?: string;
  
  /**
   * The maximum width of the container
   * @default 'xl'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  
  /**
   * Center the container horizontally
   * @default true
   */
  center?: boolean;
  
  /**
   * Horizontal padding to apply
   * @default 4
   */
  px?: number;
  
  /**
   * Vertical padding to apply
   * @default 0
   */
  py?: number;
} 