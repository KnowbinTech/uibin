<!-- lib/components/ThemeToggle/ThemeToggle.svelte -->
<script lang="ts">
  import Moon from '@lucide/svelte/icons/moon';
  import Sun from '@lucide/svelte/icons/sun';
  import { useTheme } from '../../hooks/useTheme.js';
  import type { ThemeToggleProps } from './types.js';
  
  /**
   * Additional CSS classes to add to the button
   */
  export let class$ = '';
  
  /**
   * The size of the icon in pixels
   */
  export let size: ThemeToggleProps['size'] = 20;
  
  /**
   * The aria-label for the toggle button
   */
  export let ariaLabel: ThemeToggleProps['ariaLabel'] = 'Toggle theme';
  
  // Get theme context
  const { mode, setMode } = useTheme();
  
  // Toggle theme mode between light and dark
  function toggleTheme() {
    setMode($mode === 'light' ? 'dark' : 'light');
  }
</script>

<button 
  type="button" 
  class="inline-flex items-center justify-center rounded-md p-2 bg-accent hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring {class$}"
  on:click={toggleTheme}
  aria-label={ariaLabel}
>
  {#if $mode === 'light'}
    <Moon size={size} />
  {:else}
    <Sun size={size} />
  {/if}
</button> 