/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './.storybook/**/*.{js,svelte}',
  ],
  // Add a safelist to ensure these critical classes are never purged
  safelist: [
    // Color backgrounds and text
    'bg-primary', 'bg-secondary', 'bg-accent', 'bg-card', 'bg-muted', 'bg-popover', 'bg-destructive', 'bg-background',
    'text-primary-foreground', 'text-secondary-foreground', 'text-accent-foreground', 'text-card-foreground', 
    'text-muted-foreground', 'text-popover-foreground', 'text-destructive-foreground', 'text-foreground',
    // Borders and rings
    'border-border', 'border-input', 'ring-ring',
    // Hover states 
    'hover:bg-primary/90', 'hover:bg-secondary/80', 'hover:bg-accent', 'hover:bg-muted',
    'hover:text-accent-foreground', 'hover:bg-destructive/90',
    // Focus states
    'focus-visible:ring-primary/20', 'focus-visible:border-primary', 'focus-visible:ring-ring',
    // Transparencies
    'bg-primary/10', 'bg-primary/90',
    // Specific for demo
    'bg-primary/80', 'bg-secondary/80', 'bg-accent/80', 'bg-destructive/80'
  ],
  theme: {
    extend: {
      colors: {
        // Map directly to CSS variables
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
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
  plugins: [],
}
