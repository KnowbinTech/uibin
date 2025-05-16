import type { Meta, StoryObj } from '@storybook/svelte';
import { Divider } from '..';

const meta = {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
      defaultValue: 'horizontal',
    },
    weight: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Weight/thickness of the divider',
      defaultValue: 'medium',
    },
    withLabel: {
      control: 'boolean',
      description: 'Whether the divider has a label',
      defaultValue: false,
    },
    color: {
      control: 'color',
      description: 'Custom color for the divider',
    },
    style: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Decorative style for the divider',
      defaultValue: 'solid',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    withLabel: false,
    style: 'solid',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    withLabel: true,
    style: 'solid',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
    slots: {
      default: 'OR',
    },
  }),
};

export const Dashed: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    withLabel: false,
    style: 'dashed',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const Dotted: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    withLabel: false,
    style: 'dotted',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const Thin: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'thin',
    withLabel: false,
    style: 'solid',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const Thick: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'thick',
    withLabel: false,
    style: 'solid',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const CustomColor: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    withLabel: false,
    style: 'solid',
    color: '#FF5733',
  },
  render: (args) => ({
    Component: Divider,
    props: args,
  }),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    weight: 'medium',
    withLabel: false,
    style: 'solid',
  },
  render: (args) => ({
    Component: Divider,
    props: {
      ...args,
      class: 'h-20 mx-4',
    },
  }),
};

export const DividerInContent: Story = {
  render: (args) => ({
    Component: 'div',
    slots: {
      default: `
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Section Title</h2>
          <p>This is some content above the divider.</p>
          
          ${Divider ? `<${Divider.name} orientation="horizontal" weight="medium" style="solid" />` : '<hr />'}
          
          <p>This is some content below the divider.</p>
          <p>Dividers help separate content into distinct sections.</p>
        </div>
      `,
    },
  }),
};

export const DividerWithSections: Story = {
  render: (args) => ({
    Component: 'div',
    slots: {
      default: `
        <div class="space-y-4">
          <div class="p-4 bg-card rounded-lg">
            <h3 class="font-semibold">Section 1</h3>
            <p>Content for the first section</p>
          </div>
          
          ${Divider ? `<${Divider.name} orientation="horizontal" weight="medium" withLabel="true">Section Divider</${Divider.name}>` : '<hr />'}
          
          <div class="p-4 bg-card rounded-lg">
            <h3 class="font-semibold">Section 2</h3>
            <p>Content for the second section</p>
          </div>
        </div>
      `,
    },
  }),
}; 