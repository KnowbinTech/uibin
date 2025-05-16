<!-- lib/components/ThemeToggle/ThemeToggle.svelte -->
<script lang="ts">
  import Moon from '@lucide/svelte/icons/moon';
  import Sun from '@lucide/svelte/icons/sun';
  import { useTheme } from '../../hooks/useTheme.js';
  import { get } from 'svelte/store';
  import type { ThemeToggleProps } from './types.js';
  import { forceThemeUpdate } from '../../utils/applyTheme.js';
  
  let { 
    class: className = '', 
    size = 20, 
    ariaLabel = 'Toggle theme',
    showIcon = true 
  } = $props<{
    class?: string;
    size?: ThemeToggleProps['size'];
    ariaLabel?: ThemeToggleProps['ariaLabel'];
    showIcon?: ThemeToggleProps['showIcon'];
  }>();

  // Get theme context
  const { mode, setMode } = useTheme();
  
  // Track current mode in local state
  let currentMode = $state<'light' | 'dark'>(get(mode));
  
  // Keep track of changes to mode
  $effect(() => {
    const unsubscribe = mode.subscribe((value: 'light' | 'dark') => {
      currentMode = value;
    });
    
    return () => unsubscribe();
  });
  
  // Toggle theme function
  function toggleTheme() {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    
    // Force theme update on all elements after a brief delay
    setTimeout(() => {
      forceThemeUpdate();
    }, 50);
  }
</script>

<button 
  type="button" 
  class="inline-flex items-center justify-center rounded-md p-2 bg-secondary hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-secondary-foreground {className}"
  onclick={toggleTheme}
  aria-label={ariaLabel}
>
  {#if showIcon}
    {#if currentMode === 'light'}
      <Moon size={size} />
    {:else}
      <Sun size={size} />
    {/if}
  {:else}
    {currentMode === 'light' ? 'Dark' : 'Light'}
  {/if}
</button> 