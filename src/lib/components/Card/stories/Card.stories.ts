import type { Meta, StoryObj } from '@storybook/svelte';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '..';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Apply hover effect to the card',
      defaultValue: false,
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border',
      defaultValue: true,
    },
    padding: {
      control: 'text',
      description: 'Custom padding for the card',
      defaultValue: '4',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hover: false,
    bordered: true,
    padding: '4',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <div>
          <div class="p-6">
            <h3 class="text-lg font-semibold">Card Title</h3>
            <p class="text-sm text-muted-foreground mt-2">This is a simple card with some content.</p>
          </div>
        </div>
      `,
    },
  }),
};

export const WithComponents: Story = {
  args: {
    hover: false,
    bordered: true,
    padding: '6',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <div class="mb-4 flex flex-col space-y-1.5">
          <h3 class="font-semibold text-lg">Card with Components</h3>
          <p class="text-sm text-muted-foreground">Using Card subcomponents for structure</p>
        </div>
        <div>
          <p class="text-base">This is the main content of the card.</p>
          <p class="mt-2 text-sm">It can contain any element or component.</p>
        </div>
        <div class="mt-6 flex items-center justify-end gap-2">
          <button class="bg-primary text-primaryForeground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">Save</button>
          <button class="border border-border bg-background hover:bg-accent hover:text-accentForeground h-10 px-4 py-2 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">Cancel</button>
        </div>
      `,
    },
  }),
};

export const HoverEffect: Story = {
  args: {
    hover: true,
    bordered: true,
    padding: '4',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <div>
          <div class="p-6">
            <h3 class="text-lg font-semibold">Card with Hover</h3>
            <p class="text-sm text-muted-foreground mt-2">This card has a hover effect applied.</p>
          </div>
        </div>
      `,
    },
  }),
};

export const Borderless: Story = {
  args: {
    hover: false,
    bordered: false,
    padding: '4',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <div>
          <div class="p-6">
            <h3 class="text-lg font-semibold">Borderless Card</h3>
            <p class="text-sm text-muted-foreground mt-2">This card has no border and uses a subtle shadow instead.</p>
          </div>
        </div>
      `,
    },
  }),
};

export const NoPadding: Story = {
  args: {
    hover: false,
    bordered: true,
    padding: 'none',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <img src="https://via.placeholder.com/400x200" alt="Placeholder" class="w-full h-48 object-cover rounded-t-md" />
        <div class="p-6">
          <h3 class="text-lg font-semibold">Card without Padding</h3>
          <p class="text-sm text-muted-foreground mt-2">This card has padding set to 'none', so we can add custom padding to its children.</p>
        </div>
      `,
    },
  }),
};

export const Complex: Story = {
  args: {
    hover: true,
    bordered: true,
    padding: 'none',
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <img src="https://via.placeholder.com/400x200" alt="Placeholder" class="w-full h-48 object-cover rounded-t-md" />
        <div class="p-6">
          <div class="mb-4">
            <h3 class="font-semibold text-xl">Feature-rich Card</h3>
            <p class="text-sm text-muted-foreground mt-1">A complex card example with image and action buttons</p>
          </div>
          <div class="space-y-2">
            <p>This card showcases a more complex layout with multiple sections.</p>
            <ul class="list-disc pl-5 text-sm space-y-1">
              <li>Feature one explanation</li>
              <li>Feature two explanation</li>
              <li>Feature three explanation</li>
            </ul>
          </div>
          <div class="mt-6 pt-4 border-t border-border flex justify-between">
            <button class="text-sm text-primary">Learn more</button>
            <button class="bg-primary text-primaryForeground hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">Get Started</button>
          </div>
        </div>
      `,
    },
  }),
}; 