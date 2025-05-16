import type { Meta, StoryObj } from '@storybook/svelte';
import { Stack } from '..';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the stack',
      defaultValue: 'vertical',
    },
    space: {
      control: 'number',
      description: 'Space between items',
      defaultValue: 4,
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Alignment of items',
    },
    justify: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justification of items',
    },
    wrap: {
      control: 'boolean',
      description: 'Wrap items',
      defaultValue: false,
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse order',
      defaultValue: false,
    },
    dividers: {
      control: 'boolean',
      description: 'Show dividers',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper for creating stack items
const createItems = (count: number, type: 'box' | 'card' = 'box') => {
  let items = '';
  for (let i = 1; i <= count; i++) {
    if (type === 'box') {
      items += `
        <div class="bg-primary text-primaryForeground p-4 rounded">
          Item ${i}
        </div>
      `;
    } else {
      items += `
        <div class="bg-card text-cardForeground border border-border rounded-lg p-6 shadow">
          <h3 class="text-lg font-semibold">Card ${i}</h3>
          <p class="mt-2">This is a sample card content.</p>
        </div>
      `;
    }
  }
  return items;
};

export const VerticalStack: Story = {
  args: {
    direction: 'vertical',
    space: 4,
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(3),
    },
  }),
};

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    space: 4,
    align: 'center',
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(3),
    },
  }),
};

export const ResponsiveStack: Story = {
  args: {
    direction: 'vertical',
    space: 2,
    mdDirection: 'horizontal',
    mdSpace: 4,
    align: 'center',
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(3),
    },
  }),
};

export const WithDividers: Story = {
  args: {
    direction: 'vertical',
    space: 4,
    dividers: true,
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(3, 'card'),
    },
  }),
};

export const CenteredStack: Story = {
  args: {
    direction: 'vertical',
    space: 4,
    align: 'center',
    justify: 'center',
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(3),
    },
  }),
};

export const WrappingStack: Story = {
  args: {
    direction: 'horizontal',
    space: 4,
    wrap: true,
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: createItems(8),
    },
  }),
};

export const ReverseStack: Story = {
  args: {
    direction: 'vertical',
    space: 4,
    reverse: true,
  },
  render: (args) => ({
    Component: Stack,
    props: {
      ...args,
      class: 'border border-primary rounded p-4',
    },
    slots: {
      default: `
        <div class="bg-primary text-primaryForeground p-4 rounded">First Item</div>
        <div class="bg-secondary text-secondaryForeground p-4 rounded">Second Item</div>
        <div class="bg-accent text-accentForeground p-4 rounded">Third Item</div>
      `,
    },
  }),
}; 