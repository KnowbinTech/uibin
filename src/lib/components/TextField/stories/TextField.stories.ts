import type { Meta, StoryObj } from '@storybook/svelte';
import { TextField } from '..';
import Pencil from '@lucide/svelte/icons/pencil';
import Search from '@lucide/svelte/icons/search';
import Eye from '@lucide/svelte/icons/eye';
import KeyRound from '@lucide/svelte/icons/key-round';
import Loader2 from '@lucide/svelte/icons/loader-2';

const meta = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the text field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'flushed'],
      description: 'Visual variant of the text field',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the text field',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the text field is disabled',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the text field is required',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the text field should take up the full width of its container',
      defaultValue: false,
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button when text is entered',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Type of the input',
      defaultValue: 'text',
    },
    leftIcon: {
      control: 'object',
      description: 'Icon to display before the input text',
    },
    rightIcon: {
      control: 'object',
      description: 'Icon to display after the input text',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    errorMessage: 'Password must be at least 8 characters long',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    leftIcon: Search,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    rightIcon: Pencil,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    rightIcon: Eye,
    leftIcon: KeyRound,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading example',
    placeholder: 'This field is loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'You cannot edit this field',
    disabled: true,
    value: 'Disabled content',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled variant',
    placeholder: 'Enter some text',
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline variant',
    placeholder: 'Enter some text',
    variant: 'outline',
  },
};

export const Flushed: Story = {
  args: {
    label: 'Flushed variant',
    placeholder: 'Enter some text',
    variant: 'flushed',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small field',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large field',
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width field',
    placeholder: 'This field takes up the full width',
    fullWidth: true,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable field',
    placeholder: 'Type to see clear button',
    value: 'Clear me',
    clearable: true,
  },
}; 