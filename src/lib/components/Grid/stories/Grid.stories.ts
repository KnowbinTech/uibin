import type { Meta, StoryObj } from '@storybook/svelte';
import { Grid } from '..';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Number of columns',
      defaultValue: 12,
    },
    gap: {
      control: 'number',
      description: 'Gap between grid items',
      defaultValue: 4,
    },
    gapX: {
      control: 'number',
      description: 'Column gap between grid items',
    },
    gapY: {
      control: 'number',
      description: 'Row gap between grid items',
    },
    smCols: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Columns on small screens',
    },
    mdCols: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Columns on medium screens',
    },
    lgCols: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'],
      description: 'Columns on large screens',
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense', 'row-dense', 'col-dense'],
      description: 'Grid flow direction',
      defaultValue: 'row',
    },
    autoFit: {
      control: 'boolean',
      description: 'Auto-fit grid items',
      defaultValue: false,
    },
    minColWidth: {
      control: 'text',
      description: 'Minimum width of auto-fit columns',
      defaultValue: '250px',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create grid items
const createGridItems = (count: number) => {
  let items = '';
  for (let i = 1; i <= count; i++) {
    items += `
      <div class="bg-primary text-primaryForeground p-4 rounded flex items-center justify-center">
        Item ${i}
      </div>
    `;
  }
  return items;
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(4),
    },
  }),
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(6),
    },
  }),
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(8),
    },
  }),
};

export const ResponsiveColumns: Story = {
  args: {
    cols: 1,
    smCols: 2,
    mdCols: 3,
    lgCols: 4,
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(8),
    },
  }),
};

export const DifferentGaps: Story = {
  args: {
    cols: 3,
    gapX: 8,
    gapY: 2,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(6),
    },
  }),
};

export const AutoFit: Story = {
  args: {
    autoFit: true,
    minColWidth: '200px',
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: createGridItems(8),
    },
  }),
};

export const ColumnDense: Story = {
  args: {
    cols: 3,
    flow: 'col-dense',
    gap: 4,
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: `
        <div class="bg-primary text-primaryForeground p-4 rounded col-span-2 row-span-2 flex items-center justify-center">Item 1 (2x2)</div>
        <div class="bg-secondary text-secondaryForeground p-4 rounded flex items-center justify-center">Item 2</div>
        <div class="bg-accent text-accentForeground p-4 rounded flex items-center justify-center">Item 3</div>
        <div class="bg-primary text-primaryForeground p-4 rounded flex items-center justify-center">Item 4</div>
        <div class="bg-secondary text-secondaryForeground p-4 rounded flex items-center justify-center">Item 5</div>
        <div class="bg-accent text-accentForeground p-4 rounded flex items-center justify-center">Item 6</div>
      `,
    },
  }),
}; 