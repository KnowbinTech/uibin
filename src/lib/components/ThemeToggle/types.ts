export interface ThemeToggleProps {
  /**
   * Additional CSS classes to add to the button
   */
  class?: string;
  
  /**
   * The size of the icon in pixels
   * @default 20
   */
  size?: number;
  
  /**
   * The aria-label for the toggle button
   * @default 'Toggle theme'
   */
  ariaLabel?: string;

  /**
   * Whether to show the icon or text
   * @default true
   */
  showIcon?: boolean;
} 