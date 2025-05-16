# UIBIN

A modern UI component library for SvelteKit built with Tailwind CSS 4 and Svelte 5.

## Features

- 🎨 Built with Tailwind CSS 4
- 📦 Built with Svelte 5
- 🌗 Light and dark mode support
- 🧩 Modular and customizable components
- 🔍 Fully typed with TypeScript
- 📐 Responsive design

## Installation & Setup

UIBIN can be used in two ways:

### Method 1: CLI Installation (Recommended for customization)

This method copies the components directly into your project, similar to shadcn-ui.

```bash
# Install the CLI
npm install -g @knowbintech/uibin-cli

# Initialize UIBIN in your project
uibin init

# Add components
uibin add ThemeProvider
uibin add ThemeToggle
```

Then use the components in your project:

```svelte
<script>
  import '../app.css';
  import { ThemeProvider } from '$lib/components/uibin/ThemeProvider';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>
```

### Method 2: Package Installation

Install as a traditional npm package:

```bash
# Using bun
bun add @knowbintech/uibin

# Using npm
npm install @knowbintech/uibin

# Using yarn
yarn add @knowbintech/uibin

# Using pnpm
pnpm add @knowbintech/uibin
```

Set up in your project:

1. Import the CSS file in your root layout (e.g., `+layout.svelte`):

```svelte
<script>
  import '@knowbintech/uibin/styles.css';
</script>
```

2. Wrap your app with the ThemeProvider (e.g., in your `+layout.svelte`):

```svelte
<script>
  import '@knowbintech/uibin/styles.css';
  import { ThemeProvider } from '@knowbintech/uibin';
</script>

<ThemeProvider>
  <slot />
</ThemeProvider>
```

## Usage

```svelte
<script>
  import { ThemeToggle } from '@knowbintech/uibin';
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold">My App</h1>
  <p class="my-4">Welcome to my app with UIBIN components</p>
  <ThemeToggle />
</div>
```

## Components

- **ThemeProvider**: Provides theme context to all children components
- **ThemeToggle**: A button to toggle between light and dark mode

More components coming soon!

## Development

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 18+
- [SvelteKit](https://kit.svelte.dev/)

### Local Development

```bash
# Clone the repository
git clone https://github.com/KnowbinTech/uibin.git
cd uibin

# Install dependencies
bun install

# Start the development server
bun dev

# Run Storybook
bun storybook
```

### Building

```bash
bun run package
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
