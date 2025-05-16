# Theme System Documentation

## Overview

The UIBIN theme system provides a flexible and customizable way to style components. It supports:

- Light and dark modes
- CSS variable-based theming
- Customizable color tokens
- Customizable border radius values
- System preference detection
- Persistent theme settings

## Usage

### Basic Setup

Wrap your application with the `ThemeProvider` component:

```svelte
<script>
  import { ThemeProvider } from 'uibin';
</script>

<ThemeProvider>
  <!-- Your app content here -->
</ThemeProvider>
```

### Custom Theme

You can customize the theme by providing `themeOptions`:

```svelte
<script>
  import { ThemeProvider } from 'uibin';
  
  const customTheme = {
    colors: {
      light: {
        primary: '#0ea5e9',
        border: '#e5e7eb',
      },
      dark: {
        background: '#111827',
      }
    },
    radius: {
      DEFAULT: '0.375rem',
    }
  };
</script>

<ThemeProvider themeOptions={customTheme}>
  <!-- Your app content here -->
</ThemeProvider>
```

### Theme Toggle

Add a theme toggle button to your application:

```svelte
<script>
  import { ThemeToggle } from 'uibin';
</script>

<ThemeToggle />
```

### Accessing Theme in Components

Use the `useTheme` hook in your components:

```svelte
<script>
  import { useTheme } from 'uibin';
  
  const { theme, mode, setMode } = useTheme();
  
  function handleClick() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }
</script>

<div>Current theme: {mode}</div>
<button on:click={handleClick}>Switch theme</button>
```

## Theme Provider Props

| Prop           | Type               | Default   | Description                                    |
|----------------|-------------------|-----------|------------------------------------------------|
| themeOptions   | ThemeOptions      | {}        | Custom theme options                           |
| initialMode    | 'light' \| 'dark' | 'light'   | Initial theme mode                             |
| persistMode    | boolean           | true      | Whether to save mode in localStorage           |
| syncWithSystem | boolean           | true      | Whether to sync with system theme preference   |

## CSS Variables

The theme system generates CSS variables that you can use in your styles:

### Colors

```css
/* Light mode (default) */
--color-background
--color-foreground
--color-primary
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-muted
--color-muted-foreground
--color-accent
--color-accent-foreground
--color-card
--color-card-foreground
--color-popover
--color-popover-foreground
--color-border
--color-input
--color-ring
```

### Border Radius

```css
--radius-none
--radius-sm
--radius
--radius-md
--radius-lg
--radius-xl
--radius-2xl
--radius-3xl
--radius-full
```

## Using with Tailwind

The theme system is designed to work with Tailwind CSS. You can reference the theme variables in your Tailwind config:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
    },
  },
};
``` 