import type { Meta, StoryObj } from '@storybook/svelte';
import { Radio, RadioGroup, RadioItem } from '..';

// Radio component stories
const radioMeta = {
  title: 'Forms/Radio/Single Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio button',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the radio button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio button is required',
      defaultValue: false,
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
      defaultValue: false,
    },
    value: {
      control: 'text',
      description: 'Value attribute for the radio button',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio button',
    },
  },
} satisfies Meta<typeof Radio>;

export default radioMeta;
type RadioStory = StoryObj<typeof radioMeta>;

export const Default: RadioStory = {
  args: {
    label: 'Radio option',
    name: 'radio-example',
    value: 'option',
  },
};

export const Checked: RadioStory = {
  args: {
    label: 'Selected option',
    name: 'radio-example',
    value: 'option',
    checked: true,
  },
};

export const WithHelperText: RadioStory = {
  args: {
    label: 'Radio with helper text',
    name: 'radio-example',
    value: 'option',
    helperText: 'Additional information about this option',
  },
};

export const WithError: RadioStory = {
  args: {
    label: 'Radio with error',
    name: 'radio-example',
    value: 'option',
    errorMessage: 'There is an error with this selection',
  },
};

export const Disabled: RadioStory = {
  args: {
    label: 'Disabled option',
    name: 'radio-example',
    value: 'option',
    disabled: true,
  },
};

export const DisabledChecked: RadioStory = {
  args: {
    label: 'Disabled selected option',
    name: 'radio-example',
    value: 'option',
    disabled: true,
    checked: true,
  },
};

export const Required: RadioStory = {
  args: {
    label: 'Required option',
    name: 'radio-example',
    value: 'option',
    required: true,
  },
};

export const SmallSize: RadioStory = {
  args: {
    label: 'Small radio button',
    name: 'radio-example',
    value: 'option',
    size: 'sm',
  },
};

export const LargeSize: RadioStory = {
  args: {
    label: 'Large radio button',
    name: 'radio-example',
    value: 'option',
    size: 'lg',
  },
}; 