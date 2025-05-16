import type { Meta, StoryObj } from '@storybook/svelte';
import { ThemeProvider } from '../../ThemeProvider/index.js';
import { ThemeToggle } from '../../ThemeToggle/index.js';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The ThemeProvider component provides theme context to all children components. It manages light/dark mode switching using CSS variables from app.css.'
      }
    }
  },
  argTypes: {
    initialMode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Initial theme mode to use',
    },
    persistMode: { 
      control: 'boolean',
      description: 'Whether to persist the theme mode in localStorage' 
    },
    syncWithSystem: { 
      control: 'boolean',
      description: 'Whether to sync with the system theme preference' 
    },
  },
} satisfies Meta<ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template for stories
const Template = (args: any) => ({
  Component: ThemeProvider,
  props: args,
  slot: `
    <div class="p-8 rounded-lg bg-card text-card-foreground">
      <h2 class="text-2xl font-bold mb-4">Theme Preview</h2>
      <p class="mb-4">This content is wrapped in a ThemeProvider component.</p>
      <div class="flex items-center gap-4 mb-4">
        <button class="px-4 py-2 rounded-md bg-primary text-primary-foreground">Primary Button</button>
        <button class="px-4 py-2 rounded-md bg-secondary text-secondary-foreground">Secondary Button</button>
      </div>
      <div class="flex items-center gap-4">
        <svelte:component this={ThemeToggle} />
        <span class="text-sm text-muted-foreground">Click to toggle theme</span>
      </div>
    </div>
  `,
});

// Default ThemeProvider
export const Default: Story = {
  render: Template,
  args: {
    initialMode: 'light',
    persistMode: true,
    syncWithSystem: true,
  },
};

// Dark Mode
export const DarkMode: Story = {
  render: Template,
  args: {
    initialMode: 'dark',
    persistMode: true,
    syncWithSystem: true,
  },
};

 