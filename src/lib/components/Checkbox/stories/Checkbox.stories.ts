import type { Meta, StoryObj } from '@storybook/svelte';
import { Checkbox } from '..';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the checkbox',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the checkbox',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
      defaultValue: false,
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      defaultValue: false,
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
      defaultValue: false,
    },
    value: {
      control: 'text',
      description: 'Value attribute for the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    errorMessage: 'You must accept the terms and conditions to continue',
    required: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked option',
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    required: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
}; 