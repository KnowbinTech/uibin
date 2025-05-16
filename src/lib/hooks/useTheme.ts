import { getContext } from 'svelte';
import type { ThemeContextValue } from '../types/theme';

/**
 * Hook to access the current theme context
 * @returns The theme context value
 */
export function useTheme(): ThemeContextValue {
  const themeContext = getContext<ThemeContextValue>('theme');
  
  if (!themeContext) {
    throw new Error(
      "No theme context found. Make sure your application is wrapped in a ThemeProvider component."
    );
  }
  
  return themeContext;
} 