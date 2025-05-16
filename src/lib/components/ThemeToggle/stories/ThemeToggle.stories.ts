import type { Meta, StoryObj } from '@storybook/svelte';
import { ThemeProvider } from '../../ThemeProvider/index.js';
import { ThemeToggle } from '../../ThemeToggle/index.js';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      Component: ThemeProvider,
      slot: story,
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle button component for switching between light and dark themes. Uses Lucide icons from @lucide/svelte and requires a ThemeProvider parent component.'
      }
    }
  },
  argTypes: {
    size: { 
      control: { type: 'range', min: 12, max: 48, step: 1 },
      description: 'Size of the icon in pixels'
    },
    class$: { 
      control: 'text',
      description: 'Additional CSS classes to add to the button'
    },
    ariaLabel: { 
      control: 'text',
      description: 'Accessibility label for the toggle button'
    },
  },
} satisfies Meta<ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default ThemeToggle
export const Default: Story = {
  args: {
    size: 20,
    ariaLabel: 'Toggle theme',
  },
};

// Large ThemeToggle
export const Large: Story = {
  args: {
    size: 32,
    ariaLabel: 'Toggle theme',
  },
};

// Small ThemeToggle
export const Small: Story = {
  args: {
    size: 16,
    ariaLabel: 'Toggle theme',
  },
};

// Custom Class
export const CustomClass: Story = {
  args: {
    size: 20,
    class$: 'bg-primary text-primary-foreground',
    ariaLabel: 'Toggle theme',
  },
}; 