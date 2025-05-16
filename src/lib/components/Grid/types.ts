import type { HTMLAttributes } from 'svelte/elements';

/**
 * Grid component props interface
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom CSS classes to apply to the Grid
   */
  class?: string;
  
  /**
   * Number of columns in the grid
   * @default 12
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Gap between grid items
   * @default 4
   */
  gap?: number;
  
  /**
   * Column gap between grid items
   */
  gapX?: number;
  
  /**
   * Row gap between grid items
   */
  gapY?: number;
  
  /**
   * Responsive columns definition for small screens (sm)
   */
  smCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Responsive columns definition for medium screens (md)
   */
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Responsive columns definition for large screens (lg)
   */
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Responsive columns definition for extra large screens (xl)
   */
  xlCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Responsive columns definition for 2xl screens
   */
  xxlCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
  
  /**
   * Flow direction of the grid items
   * @default 'row'
   */
  flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
  
  /**
   * Auto-fit grid items instead of explicit columns
   */
  autoFit?: boolean;
  
  /**
   * Minimum width of auto-fit columns (only used when autoFit is true)
   * @default '250px'
   */
  minColWidth?: string;
} 