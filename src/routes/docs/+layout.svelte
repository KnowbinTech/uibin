<script lang="ts">
  // This layout inherits from the root layout
  import { ThemeToggle, useTheme } from '$lib/index.js';
  let { children } = $props();
  
  // Access theme to ensure proper theme state
  const { mode } = useTheme();
  let currentTheme = $state('light');
  
  // Track theme changes
  $effect(() => {
    const unsubscribe = mode.subscribe((value: 'light' | 'dark') => {
      currentTheme = value;
    });
    
    return () => unsubscribe();
  });
  
  // Component categories with their components
  const components = [
    {
      category: 'Layout',
      items: [
        { id: 'box', name: 'Box' },
        { id: 'container', name: 'Container' },
        { id: 'grid', name: 'Grid' },
        { id: 'stack', name: 'Stack' }
      ]
    },
    {
      category: 'UI Components',
      items: [
        { id: 'button', name: 'Button' },
        { id: 'button-group', name: 'ButtonGroup' },
        { id: 'card', name: 'Card' },
        { id: 'checkbox', name: 'Checkbox' },
        { id: 'divider', name: 'Divider' },
        { id: 'radio', name: 'Radio' },
        { id: 'select', name: 'Select' },
        { id: 'slider', name: 'Slider' },
        { id: 'switch', name: 'Switch' },
        { id: 'text-field', name: 'TextField' },
        { id: 'text-area', name: 'TextArea' },
        { id: 'date-picker', name: 'DatePicker' }
      ]
    },
    {
      category: 'Theme',
      items: [
        { id: 'theme-provider', name: 'ThemeProvider' },
        { id: 'theme-toggle', name: 'ThemeToggle' }
      ]
    }
  ];
  
  // Function to handle sidebar item click
  function scrollToComponent(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <!-- Sidebar -->
  <aside class="w-64 bg-muted/30 border-r border-border h-screen sticky top-0 overflow-y-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold">UI Components</h2>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">{currentTheme}</span>
        <ThemeToggle size={18} />
      </div>
    </div>
    
    <nav class="space-y-6">
      {#each components as category}
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-2">{category.category}</h3>
          <ul class="space-y-1">
            {#each category.items as item}
              <li>
                <a 
                  href={`#${item.id}`} 
                  class="block px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors"
                  on:click|preventDefault={() => scrollToComponent(item.id)}
                >
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>
  
  <!-- Main content -->
  <div class="flex-1 relative">
    <div class="p-6 bg-background text-foreground">
      {@render children()}
    </div>
  </div>
</div>