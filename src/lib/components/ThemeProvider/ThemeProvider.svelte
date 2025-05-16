<!-- lib/components/ThemeProvider/ThemeProvider.svelte -->
<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { ThemeProviderProps } from './types.js';
  import type { ThemeContextValue } from '../../types/theme.js';
  import { applyTheme, initializeTheme } from '../../utils/applyTheme.js';
  
  let { 
    children,
    initialMode = 'light', 
    persistMode = true, 
    syncWithSystem = true,
    customColors = undefined,
    debug = false
  } = $props<{
    children: any;
    initialMode?: ThemeProviderProps['initialMode'];
    persistMode?: ThemeProviderProps['persistMode'];
    syncWithSystem?: ThemeProviderProps['syncWithSystem'];
    customColors?: ThemeProviderProps['customColors'];
    debug?: ThemeProviderProps['debug'];
  }>();
  
  // Initialize theme state
  let initialThemeMode = initialMode;
  
  // Toggle console debugging
  const log = debug 
    ? (...args: any[]) => console.debug('[ThemeProvider]', ...args) 
    : () => {};
  
  // Create the mode store
  const mode = writable<'light' | 'dark'>(initialThemeMode);
  
  // Local reactive state
  let currentMode = $state<'light' | 'dark'>(initialThemeMode);
  
  // Function to set the theme mode
  function setMode(newMode: 'light' | 'dark') {
    log(`Setting mode to ${newMode}`);
    
    // Update the store and local state
    mode.set(newMode);
    currentMode = newMode;
    
    // Persist to localStorage
    if (typeof window !== 'undefined' && persistMode) {
      localStorage.setItem('uibin-theme', newMode);
      log('Theme saved to localStorage');
    }
    
    // Apply theme using utility
    applyTheme(newMode, customColors);
  }
  
  // Watch for currentMode changes
  $effect(() => {
    if (typeof document !== 'undefined') {
      log(`Effect triggered with mode: ${currentMode}`);
      applyTheme(currentMode, customColors);
    }
  });
  
  // Create theme context for child components
  const themeContext: ThemeContextValue = {
    mode,
    setMode,
  };
  
  // Set context so child components can access theme
  setContext('theme', themeContext);
  
  // Apply theme on initialization
  $effect.pre(() => {
    if (typeof document !== 'undefined') {
      log('Pre-effect: applying theme');
      applyTheme(currentMode, customColors);
    }
  });

  onMount(() => {
    log('ThemeProvider mounted');
    
    // Initialize theme with current mode
    initializeTheme(currentMode);
    
    // Get saved theme from localStorage if available
    let savedTheme: 'light' | 'dark' | null = null;
    if (persistMode && typeof localStorage !== 'undefined') {
      savedTheme = localStorage.getItem('uibin-theme') as 'light' | 'dark' | null;
      log(`Saved theme from localStorage: ${savedTheme}`);
    }
    
    // Check system preference if enabled and no saved preference
    let detectedTheme = initialMode;
    if (!savedTheme && syncWithSystem && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      detectedTheme = prefersDark ? 'dark' : 'light';
      log(`System preference detected: ${detectedTheme}`);
    }
    
    // Set theme based on priority: localStorage > system preference > initialMode
    const themeToUse = savedTheme || detectedTheme;
    log(`Using theme: ${themeToUse} (saved: ${!!savedTheme}, system: ${syncWithSystem})`);
    setMode(themeToUse);
    
    // Listen for system theme changes
    if (syncWithSystem && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (event: MediaQueryListEvent) => {
        // Only follow system preference if user hasn't explicitly set a theme
        if (persistMode && !localStorage.getItem('uibin-theme')) {
          const newMode = event.matches ? 'dark' : 'light';
          log(`System theme changed to: ${newMode}`);
          setMode(newMode);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  });
</script>

{@render children()} 