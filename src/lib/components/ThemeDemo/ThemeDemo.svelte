<!-- src/lib/components/ThemeDemo/ThemeDemo.svelte -->
<script lang="ts">
  import { useTheme } from '../../hooks/useTheme.js';
  import { colors } from '../../theme/colors.js';
  import { ThemeToggle } from '../ThemeToggle/index.js';
  import type { ThemeDemoProps } from './types.js';
  
  let { 
    showComponentName = true,
    class: className = '' 
  } = $props<{
    showComponentName?: ThemeDemoProps['showComponentName'];
    class?: ThemeDemoProps['class'];
  }>();
  
  // Get current theme
  const { mode } = useTheme();
  
  // Get the color names dynamically from the theme colors object
  const mainColorNames = Object.keys(colors.light).filter(key => 
    !key.includes('-foreground') && key !== 'background' && key !== 'foreground'
  );
  
  let currentTheme = $state('light');
  
  // Update local state when theme changes
  $effect(() => {
    mode.subscribe((value: 'light' | 'dark') => {
      currentTheme = value;
    });
  });
  
  // Helper to determine contrasting text color for a given background
  function getContrastingTextColor(colorName: string): string {
    if (colorName.includes('foreground')) return 'inherit';
    
    // For primary colors, we use their foreground color
    if (mainColorNames.includes(colorName)) {
      return `var(--${colorName}-foreground)`;
    }
    
    // Default: dark text on light backgrounds, light text on dark backgrounds
    return currentTheme === 'light' ? 'black' : 'white';
  }
  
  // Get CSS variable value through getComputedStyle for demo purposes
  function getComputedThemeValue(name: string): string {
    if (typeof window === 'undefined' || typeof document === 'undefined') return '';
    
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`).trim();
  }
</script>

<div class="p-8 bg-background text-foreground rounded-lg border border-border shadow-sm {className}">
  {#if showComponentName}
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">Theme Demo</h2>
      <ThemeToggle />
    </div>
  {/if}
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div class="p-5 bg-card text-card-foreground rounded-md border border-border shadow-sm">
      <h3 class="text-lg font-medium mb-3">Current Theme: {currentTheme}</h3>
      <p class="text-muted-foreground">This component shows all the theme colors and their usage.</p>
    </div>
    
    <div class="p-5 bg-muted text-muted-foreground rounded-md border border-border shadow-sm">
      <h3 class="text-lg font-medium mb-3">Theme Customization</h3>
      <p>Colors are applied using CSS variables and Tailwind classes.</p>
    </div>
  </div>
  
  <div class="mb-8">
    <h3 class="text-lg font-medium mb-4">Main Colors</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each mainColorNames as colorName}
        <div
          class="rounded-md p-4 h-28 flex flex-col justify-between border shadow-sm"
          style="background-color: var(--{colorName}); color: {getContrastingTextColor(colorName)};"
        >
          <div class="font-medium">{colorName}</div>
          <div class="opacity-80 text-sm">{getComputedThemeValue(colorName)}</div>
        </div>
        
        <div
          class="rounded-md p-4 h-28 flex flex-col justify-between border shadow-sm"
          style="background-color: var(--{colorName}-foreground); color: var(--{colorName});"
        >
          <div class="font-medium">{colorName}-foreground</div>
          <div class="opacity-80 text-sm">{getComputedThemeValue(`${colorName}-foreground`)}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="mb-8">
    <h3 class="text-lg font-medium mb-4">Base & Special Colors</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Background -->
      <div
        class="rounded-md p-4 h-28 flex flex-col justify-between border shadow-sm"
        style="background-color: var(--background); color: var(--foreground);"
      >
        <div class="font-medium">background</div>
        <div class="opacity-80 text-sm">{getComputedThemeValue('background')}</div>
      </div>
      
      <!-- Foreground -->
      <div
        class="rounded-md p-4 h-28 flex flex-col justify-between border shadow-sm"
        style="background-color: var(--foreground); color: var(--background);"
      >
        <div class="font-medium">foreground</div>
        <div class="opacity-80 text-sm">{getComputedThemeValue('foreground')}</div>
      </div>
      
      <!-- Border -->
      <div
        class="rounded-md p-4 h-28 flex flex-col justify-between shadow-sm"
        style="background-color: var(--background); color: var(--foreground); border: 4px solid var(--border);"
      >
        <div class="font-medium">border</div>
        <div class="opacity-80 text-sm">{getComputedThemeValue('border')}</div>
      </div>
      
      <!-- Ring -->
      <div
        class="rounded-md p-4 h-28 flex flex-col justify-between outline outline-offset-2 shadow-sm"
        style="background-color: var(--background); color: var(--foreground); outline-color: var(--ring);"
      >
        <div class="font-medium">ring</div>
        <div class="opacity-80 text-sm">{getComputedThemeValue('ring')}</div>
      </div>
    </div>
  </div>
  
  <div>
    <h3 class="text-lg font-medium mb-4">Tailwind Usage Examples</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-primary text-primary-foreground p-4 rounded-md shadow-sm">
        Primary - <code>bg-primary text-primary-foreground</code>
      </div>
      
      <div class="bg-secondary text-secondary-foreground p-4 rounded-md shadow-sm">
        Secondary - <code>bg-secondary text-secondary-foreground</code>
      </div>
      
      <div class="bg-accent text-accent-foreground p-4 rounded-md shadow-sm">
        Accent - <code>bg-accent text-accent-foreground</code>
      </div>
      
      <div class="bg-muted text-muted-foreground p-4 rounded-md shadow-sm">
        Muted - <code>bg-muted text-muted-foreground</code>
      </div>
      
      <div class="bg-destructive text-destructive-foreground p-4 rounded-md shadow-sm">
        Destructive - <code>bg-destructive text-destructive-foreground</code>
      </div>
      
      <div class="bg-card text-card-foreground shadow p-4 rounded-md">
        Card - <code>bg-card text-card-foreground</code>
      </div>
    </div>
  </div>
</div> 