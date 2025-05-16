import type { ThemeOptions } from '../../types/theme';

export interface ThemeProviderProps {
  /**
   * Custom theme options to override the default theme
   */
  themeOptions?: ThemeOptions;
  
  /**
   * Initial theme mode
   * @default 'light'
   */
  initialMode?: 'light' | 'dark';
  
  /**
   * Whether to persist the theme mode in localStorage
   * @default true
   */
  persistMode?: boolean;
  
  /**
   * Whether to sync with the system theme preference
   * @default true
   */
  syncWithSystem?: boolean;

  /**
   * Custom colors to apply to the theme
   * @default undefined
   */
  customColors?: Record<string, string>;

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
} 