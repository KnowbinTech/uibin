import type { Meta, StoryObj } from '@storybook/svelte';
import { Container } from '..';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'none'],
      description: 'Maximum width of the container',
      defaultValue: 'xl',
    },
    center: {
      control: 'boolean',
      description: 'Center the container horizontally',
      defaultValue: true,
    },
    px: {
      control: 'number',
      description: 'Horizontal padding',
      defaultValue: 4,
    },
    py: {
      control: 'number',
      description: 'Vertical padding',
      defaultValue: 0,
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    center: true,
    px: 4,
    py: 0,
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <div class="border border-dashed border-primary p-4">
          Container content. This container has a max-width of 'xl'.
        </div>
      `,
    },
  }),
};

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    center: true,
    px: 4,
    py: 0,
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <div class="border border-dashed border-primary p-4">
          A small container with max-width of 'sm'.
        </div>
      `,
    },
  }),
};

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    px: 4,
    py: 0,
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <div class="border border-dashed border-primary p-4">
          A medium container with max-width of 'md'.
        </div>
      `,
    },
  }),
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    px: 4,
    py: 0,
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <div class="border border-dashed border-primary p-4">
          A large container with max-width of 'lg'.
        </div>
      `,
    },
  }),
};

export const WithBoxes: Story = {
  args: {
    maxWidth: 'xl',
    center: true,
    px: 4,
    py: 6,
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <div class="space-y-4">
          <div class="bg-primary text-primaryForeground p-4 rounded">
            Box within Container
          </div>
          <div class="bg-secondary text-secondaryForeground p-4 rounded">
            Another Box within Container
          </div>
          <div class="bg-accent text-accentForeground p-4 rounded">
            Yet another Box within Container
          </div>
        </div>
      `,
    },
  }),
}; 