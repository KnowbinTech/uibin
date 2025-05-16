# UIBIN Theme System

## Overview

UIBIN uses a powerful and flexible theme system that allows for complete customization of colors, spacing, and other design tokens. The theme system is built on top of CSS variables and works seamlessly with Tailwind CSS 4.

## Core Concepts

### CSS Variables

The theme system uses CSS variables to define design tokens. These variables are defined in the `:root` selector and can be overridden for dark mode using the `.dark` class.

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(221.2 83.2% 53.3%);
  /* more variables... */
}

.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  /* more dark theme variables... */
}
```

### Tailwind Integration

Tailwind is configured to use these CSS variables, allowing you to use utility classes like `bg-primary` or `text-muted-foreground` throughout your components.

```svelte
<button class="bg-primary text-primary-foreground">Click me</button>
```

### Theme Provider

The `ThemeProvider` component is the core of the theme system. It must wrap your application to enable theme switching and context sharing.

```svelte
<ThemeProvider initialMode="light" persistMode={true} syncWithSystem={true}>
  <App />
</ThemeProvider>
```

## Using the Theme System

### Basic Setup

1. Wrap your application with the `ThemeProvider` component:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { ThemeProvider } from '@knowbintech/uibin';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>
```

2. Add the ThemeToggle component to allow users to switch between light and dark modes:

```svelte
<script>
  import { ThemeToggle } from '@knowbintech/uibin';
</script>

<ThemeToggle />
```

### Accessing Theme in Components

You can access and manipulate the current theme using the `useTheme` hook:

```svelte
<script>
  import { useTheme } from '@knowbintech/uibin';
  
  const { mode, setMode } = useTheme();
  
  // Create a reactive variable that updates when theme changes
  let currentTheme = $state('loading...');
  
  $effect(() => {
    const unsubscribe = mode.subscribe((value) => {
      currentTheme = value;
    });
    
    return () => unsubscribe();
  });
  
  function toggleTheme() {
    const newMode = currentTheme === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }
</script>

<div>Current theme: {currentTheme}</div>
<button onclick={toggleTheme}>Toggle theme</button>
```

### Theme Customization

You can customize the theme by overriding the CSS variables in your global stylesheet:

```css
/* app.css */
:root {
  --primary: hsl(230 100% 50%); /* Custom primary color */
  --border-radius: 0.25rem; /* Custom border radius */
}

.dark {
  --primary: hsl(230 70% 60%); /* Custom dark mode primary color */
}
```

Or by using the theme utilities:

```svelte
<script>
  import { setCssVar, getCssVar } from '@knowbintech/uibin';
  
  // Set a custom primary color
  setCssVar('primary', 'hsl(230 100% 50%)');
  
  // Get the current value of a CSS variable
  const currentPrimary = getCssVar('primary');
</script>
```

### ThemeProvider Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `initialMode` | `'light' \| 'dark'` | `'light'` | Initial theme mode |
| `persistMode` | `boolean` | `true` | Whether to persist the theme mode in localStorage |
| `syncWithSystem` | `boolean` | `true` | Whether to sync with the system theme preference |
| `customColors` | `Record<string, string>` | `undefined` | Custom colors to apply to the theme |
| `debug` | `boolean` | `false` | Enable debug logging |

### Theme Utilities

UIBIN provides several utilities for working with themes:

- `applyTheme(mode, customColors)`: Apply a theme mode and optional custom colors
- `initializeTheme(mode)`: Safely initialize theme on mount
- `getCssVar(name)`: Get the value of a CSS variable
- `setCssVar(name, value)`: Set the value of a CSS variable
- `systemPrefersDarkMode()`: Check if the system prefers dark mode
- `watchSystemColorScheme(callback)`: Watch for system color scheme changes
- `resolveTheme(savedTheme, systemPreference, defaultTheme)`: Determine which theme to use

## Color System

The UIBIN color system follows a semantic naming convention:

- `background` / `foreground`: Base background and text colors
- `primary` / `primary-foreground`: Main brand color and text that appears on it
- `secondary` / `secondary-foreground`: Secondary color and text on it
- `muted` / `muted-foreground`: Subtle backgrounds and de-emphasized text
- `accent` / `accent-foreground`: Highlight colors and text on them
- `card` / `card-foreground`: Card backgrounds and text
- `popover` / `popover-foreground`: Popover backgrounds and text
- `destructive` / `destructive-foreground`: Error state colors and text
- `border`: Border colors
- `input`: Form input borders
- `ring`: Focus rings

## Best Practices

1. Always wrap your application with the `ThemeProvider` component
2. Use Tailwind utility classes that reference theme variables
3. For dynamic styles, use the `getCssVar` and `setCssVar` utilities
4. Consider both light and dark mode in your component designs
5. Test components in both themes during development 