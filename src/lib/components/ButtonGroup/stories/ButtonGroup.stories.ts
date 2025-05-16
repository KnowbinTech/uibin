import type { Meta, StoryObj } from '@storybook/svelte';
import { ButtonGroup } from '../../ButtonGroup/index.js';
import { Button } from '../../Button/index.js';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the button group',
      defaultValue: 'horizontal',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignment of the buttons within the group',
      defaultValue: 'start',
    },
    spacing: {
      control: 'select',
      options: ['default', 'compact', 'loose', 'none'],
      description: 'Spacing between buttons',
      defaultValue: 'default',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the button group full width',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
    align: 'start',
    spacing: 'default',
    fullWidth: false,
  },
  render: (args) => ({
    Component: ButtonGroup,
    props: args,
    slots: {
      default: `
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 1</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 2</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 3</button>
      `,
    },
  }),
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    align: 'stretch',
    spacing: 'default',
    fullWidth: false,
  },
  render: (args) => ({
    Component: ButtonGroup,
    props: args,
    slots: {
      default: `
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 1</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 2</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 3</button>
      `,
    },
  }),
};

export const Centered: Story = {
  args: {
    direction: 'horizontal',
    align: 'center',
    spacing: 'default',
    fullWidth: false,
  },
  render: (args) => ({
    Component: ButtonGroup,
    props: args,
    slots: {
      default: `
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 1</button>
        <button class="bg-secondary text-secondaryForeground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 2</button>
        <button class="border border-border bg-background hover:bg-accent hover:text-accentForeground inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 3</button>
      `,
    },
  }),
};

export const CompactSpacing: Story = {
  args: {
    direction: 'horizontal',
    align: 'start',
    spacing: 'compact',
    fullWidth: false,
  },
  render: (args) => ({
    Component: ButtonGroup,
    props: args,
    slots: {
      default: `
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 1</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 2</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2">Button 3</button>
      `,
    },
  }),
};

export const FullWidth: Story = {
  args: {
    direction: 'horizontal',
    align: 'stretch',
    spacing: 'default',
    fullWidth: true,
  },
  render: (args) => ({
    Component: ButtonGroup,
    props: args,
    slots: {
      default: `
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2 flex-1">Button 1</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2 flex-1">Button 2</button>
        <button class="bg-primary text-primaryForeground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 px-4 py-2 flex-1">Button 3</button>
      `,
    },
  }),
}; 