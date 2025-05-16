import type { Theme } from '../types/theme';
import { colors } from '../theme/colors';

/**
 * Applies theme CSS variables to the document root element
 * @param mode - The theme mode ('light' or 'dark')
 * @param customColors - Optional custom colors to override defaults
 */
export function applyTheme(
  mode: 'light' | 'dark',
  customColors?: Partial<typeof colors.light>
): void {
  if (typeof document === 'undefined') return;
  
  // Get the appropriate color set based on the mode
  const themeColors = mode === 'light' ? colors.light : colors.dark;
  
  // Merge with any custom colors if provided
  const mergedColors = customColors 
    ? { ...themeColors, ...customColors }
    : themeColors;
  
  // Apply each CSS variable to the document root
  Object.entries(mergedColors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
  
  // Add the theme class to the document
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);
  
  // Set the theme data attribute
  document.documentElement.setAttribute('data-theme', mode);
  
  // Force style recalculation
  document.body.style.backgroundColor = '';
  document.body.offsetHeight; // Force a reflow
  
  // For debugging
  console.debug(`Theme applied: ${mode}`);
}

/**
 * A special version that safely applies theme on initial load or SSR
 * This can be used in onMount or server-side rendering contexts
 */
export function initializeTheme(mode: 'light' | 'dark'): void {
  // Handle both SSR and CSR cases
  try {
    if (typeof window !== 'undefined') {
      // Client-side
      requestAnimationFrame(() => {
        applyTheme(mode);
      });
    }
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
}

/**
 * Force update the theme on specific elements by temporarily toggling classes
 * This can be useful for components that aren't properly inheriting theme changes
 * @param selector - CSS selector for elements to update
 */
export function forceThemeUpdate(selector: string = '*[class*="bg-"]'): void {
  if (typeof document === 'undefined') return;
  
  try {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Add and remove a temporary class to force style recalculation
      el.classList.add('__theme-update__');
      
      // Force a reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;
      
      // Remove the temporary class
      el.classList.remove('__theme-update__');
    });
  } catch (error) {
    console.error('Error forcing theme update:', error);
  }
} 