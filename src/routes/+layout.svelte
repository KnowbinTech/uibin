<script>
  import { ThemeProvider, ThemeToggle } from '$lib/index.js';
  import "../app.css";
  
  let { children } = $props();
</script>

<ThemeProvider initialMode="light" persistMode={true} syncWithSystem={true} debug={false}>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">UIBIN</h1>
      <ThemeToggle />
    </header>
    <main>
      {@render children()}
    </main>
  </div>
</ThemeProvider>