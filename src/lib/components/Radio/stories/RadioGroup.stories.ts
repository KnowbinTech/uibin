import type { Meta, StoryObj } from '@storybook/svelte';
import { RadioGroup } from '..';

const meta = {
  title: 'Forms/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the radio group',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio group',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below the radio group',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio buttons in the group',
      defaultValue: 'md',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the radio buttons',
      defaultValue: 'vertical',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether a selection is required',
      defaultValue: false,
    },
    name: {
      control: 'text',
      description: 'Name attribute for all radios in the group',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select an option',
    name: 'radio-group-example',
  },
  render: (args) => ({
    Component: RadioGroup,
    props: args,
    slots: {
      default: `
        <div class="space-y-2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option1" name="${args.name}" value="option1" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option1' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option1" class="font-medium text-sm">Option 1</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option2" name="${args.name}" value="option2" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option2' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option2" class="font-medium text-sm">Option 2</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option3" name="${args.name}" value="option3" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option3' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option3" class="font-medium text-sm">Option 3</label>
            </div>
          </div>
        </div>
      `,
    },
  }),
};

export const Horizontal: Story = {
  args: {
    label: 'Select an option',
    name: 'radio-group-horizontal',
    orientation: 'horizontal',
  },
  render: (args) => ({
    Component: RadioGroup,
    props: args,
    slots: {
      default: `
        <div class="flex space-x-4">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option1-h" name="${args.name}" value="option1" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option1' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option1-h" class="font-medium text-sm">Option 1</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option2-h" name="${args.name}" value="option2" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option2' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option2-h" class="font-medium text-sm">Option 2</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option3-h" name="${args.name}" value="option3" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option3' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option3-h" class="font-medium text-sm">Option 3</label>
            </div>
          </div>
        </div>
      `,
    },
  }),
};

export const WithHelperText: Story = {
  args: {
    label: 'Select a size',
    name: 'radio-group-helper',
    helperText: 'Choose the size that best fits your needs',
  },
  render: (args) => ({
    Component: RadioGroup,
    props: args,
    slots: {
      default: `
        <div class="space-y-2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="small" name="${args.name}" value="small" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'small' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="small" class="font-medium text-sm">Small</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="medium" name="${args.name}" value="medium" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'medium' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="medium" class="font-medium text-sm">Medium</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="large" name="${args.name}" value="large" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'large' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="large" class="font-medium text-sm">Large</label>
            </div>
          </div>
        </div>
      `,
    },
  }),
};

export const WithError: Story = {
  args: {
    label: 'Select a package',
    name: 'radio-group-error',
    errorMessage: 'Please select a package to continue',
    required: true,
  },
  render: (args) => ({
    Component: RadioGroup,
    props: args,
    slots: {
      default: `
        <div class="space-y-2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="basic" name="${args.name}" value="basic" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'basic' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="basic" class="font-medium text-sm">Basic</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="pro" name="${args.name}" value="pro" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'pro' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="pro" class="font-medium text-sm">Pro</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="enterprise" name="${args.name}" value="enterprise" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'enterprise' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="enterprise" class="font-medium text-sm">Enterprise</label>
            </div>
          </div>
        </div>
      `,
    },
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Currently unavailable options',
    name: 'radio-group-disabled',
    disabled: true,
  },
  render: (args) => ({
    Component: RadioGroup,
    props: args,
    slots: {
      default: `
        <div class="space-y-2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option1-d" name="${args.name}" value="option1" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option1' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option1-d" class="font-medium text-sm opacity-50">Option 1</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option2-d" name="${args.name}" value="option2" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option2' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option2-d" class="font-medium text-sm opacity-50">Option 2</label>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="radio" id="option3-d" name="${args.name}" value="option3" class="h-4 w-4 border rounded-full border-border text-primary" ${args.value === 'option3' ? 'checked' : ''} ${args.disabled ? 'disabled' : ''} />
            </div>
            <div class="ml-2">
              <label for="option3-d" class="font-medium text-sm opacity-50">Option 3</label>
            </div>
          </div>
        </div>
      `,
    },
  }),
}; 