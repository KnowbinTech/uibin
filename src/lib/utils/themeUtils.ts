/**
 * Theme utility functions
 */

/**
 * Safely get a CSS variable value from the document
 * @param name - CSS variable name without the -- prefix
 * @returns The computed value of the CSS variable or an empty string if not found
 */
export function getCssVar(name: string): string {
  if (typeof document === 'undefined') return '';
  
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`).trim();
}

/**
 * Set a CSS variable
 * @param name - CSS variable name without the -- prefix
 * @param value - Value to set
 */
export function setCssVar(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  
  document.documentElement.style.setProperty(`--${name}`, value);
}

/**
 * Detect if the system prefers dark mode
 * @returns True if the system prefers dark mode, false otherwise
 */
export function systemPrefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Create a reactive subscription to system color scheme changes
 * @param callback - Function to call when the system color scheme changes
 * @returns Cleanup function
 */
export function watchSystemColorScheme(
  callback: (isDark: boolean) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (event: MediaQueryListEvent) => {
    callback(event.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Determine which theme to use based on preferences
 * @param savedTheme - User's saved theme preference
 * @param systemPreference - System theme preference
 * @param defaultTheme - Default theme to use if no preferences exist
 * @returns The theme to use
 */
export function resolveTheme(
  savedTheme: 'light' | 'dark' | null,
  systemPreference: boolean,
  defaultTheme: 'light' | 'dark' = 'light'
): 'light' | 'dark' {
  // Priority: saved theme > system preference > default
  if (savedTheme) {
    return savedTheme;
  }
  
  if (systemPreference !== null) {
    return systemPreference ? 'dark' : 'light';
  }
  
  return defaultTheme;
} 