<script lang="ts">
  import { Button, ThemeToggle, ThemeDemo } from '$lib/index.js';
  import { useTheme } from '$lib/hooks/useTheme.js';
  
  // Get current theme 
  const { mode } = useTheme();
  let currentTheme = $state('loading...');
  
  // Subscribe to theme changes
  $effect(() => {
    const unsubscribe = mode.subscribe((value: 'light' | 'dark') => {
      currentTheme = value;
    });
    
    return () => unsubscribe();
  });
</script>

<div class="flex flex-col items-center p-4">
  <h1 class="text-4xl font-bold mb-6">Welcome to UIBIN</h1>
  <p class="text-xl mb-8 max-w-2xl text-center">A modern, accessible component library for Svelte applications</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mb-8">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold">Getting Started</h2>
      <p class="text-muted-foreground">UIBIN is a customizable component library built with Svelte 5, TypeScript, and Tailwind 4.</p>
      
      <div class="p-4 bg-card text-card-foreground rounded-lg border border-border">
        <h3 class="text-lg font-medium mb-2">Installation</h3>
        <pre class="bg-muted p-2 rounded text-sm overflow-x-auto">
          <code>npm install @knowbintech/uibin</code>
        </pre>
      </div>
      
      <div class="space-x-4">
        <Button href="/docs" text="View Documentation" variant="primary" size="lg" />
        <Button href="https://github.com/your-username/uibin" target="_blank" rel="noopener noreferrer" text="GitHub" variant="outline" size="lg" />
      </div>
    </div>
    
    <div class="bg-card p-4 rounded-lg border border-border">
      <h2 class="text-2xl font-bold mb-4">Try the Theme System</h2>
      <ThemeToggle class="mb-4" />
      <p class="mb-4">Current theme: <span class="font-semibold">{currentTheme}</span></p>
      <p class="text-muted-foreground mb-2">Theme colors are automatically applied to all components.</p>
    </div>
  </div>
  
  <div class="w-full max-w-7xl">
    <ThemeDemo />
  </div>
</div>
