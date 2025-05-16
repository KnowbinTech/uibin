# UIBIN CLI

A CLI tool for adding UIBIN components to your SvelteKit project.

## Installation

```bash
# Using npm
npm install -g @knowbintech/uibin-cli

# Using bun
bun install -g @knowbintech/uibin-cli

# Using yarn
yarn global add @knowbintech/uibin-cli

# Using pnpm
pnpm add -g @knowbintech/uibin-cli
```

## Usage

### Initialize UIBIN in your project

```bash
# This will set up the directory structure and add the theme CSS
uibin init
```

### Add components

```bash
# Add a specific component
uibin add ThemeProvider
uibin add ThemeToggle

# Or select from a list
uibin add
```

## Available Components

- **ThemeProvider**: Provides theme context to all children components
- **ThemeToggle**: A button to toggle between light and dark mode

More components will be added in future releases.

## How It Works

The UIBIN CLI copies components directly into your project's `src/lib/components/uibin` directory, allowing you to easily customize them for your specific needs.

Unlike traditional component libraries that you import from `node_modules`, UIBIN follows the utility-first approach popularized by shadcn-ui, giving you full control over your components. 