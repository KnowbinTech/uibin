<!-- lib/components/ThemeProvider/ThemeProvider.svelte -->
<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { ThemeProviderProps } from './types.js';
  import type { ThemeContextValue } from '../../types/theme.js';
  
  /**
   * Initial theme mode
   */
  export let initialMode: ThemeProviderProps['initialMode'] = 'light';
  
  /**
   * Whether to persist the theme mode in localStorage
   */
  export let persistMode: ThemeProviderProps['persistMode'] = true;
  
  /**
   * Whether to sync with the system theme preference
   */
  export let syncWithSystem: ThemeProviderProps['syncWithSystem'] = true;
  
  // Create the mode store
  const mode = writable<'light' | 'dark'>(initialMode || 'light');
  
  // Set the theme mode
  function setMode(newMode: 'light' | 'dark') {
    mode.set(newMode);
    
    if (persistMode && typeof localStorage !== 'undefined') {
      localStorage.setItem('uibin-theme', newMode);
    }
    
    applyThemeMode(newMode);
  }
  
  // Apply theme mode to document
  function applyThemeMode(themeMode: 'light' | 'dark') {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', themeMode === 'dark');
    }
  }
  
  // Set up theme context
  const themeContext: ThemeContextValue = {
    mode,
    setMode,
  };
  
  setContext('theme', themeContext);
  
  onMount(() => {
    let initialThemeMode = initialMode || 'light';
    
    // Check for saved theme preference
    if (persistMode && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('uibin-theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        initialThemeMode = savedTheme;
      } else if (syncWithSystem && typeof window !== 'undefined') {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialThemeMode = prefersDark ? 'dark' : 'light';
      }
    }
    
    mode.set(initialThemeMode);
    applyThemeMode(initialThemeMode);
    
    // Listen for system theme changes
    if (syncWithSystem && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (event: MediaQueryListEvent) => {
        if (!localStorage.getItem('uibin-theme')) {
          const newMode = event.matches ? 'dark' : 'light';
          mode.set(newMode);
          applyThemeMode(newMode);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  });
</script>

<slot></slot> 