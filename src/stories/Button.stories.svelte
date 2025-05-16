<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import { Button } from '../lib/components/Button/index.js';
import Pencil from '@lucide/svelte/icons/pencil';
import AlertCircle from '@lucide/svelte/icons/alert-circle';
import Loader2 from '@lucide/svelte/icons/loader-2';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'primary', 'secondary', 'danger', 'ghost', 'link', 'outline'],
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg', 'icon'],
      },
      disabled: {
        control: 'boolean',
      },
      loading: {
        control: 'boolean',
      },
      fullWidth: {
        control: 'boolean',
      },
      leftIcon: {
        control: 'object',
      },
      rightIcon: {
        control: 'object',
      },
    },
    args: {
      onClick: fn(),
    }
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ children: 'Default Button' }} />

<Story name="Primary" args={{ variant: 'primary', children: 'Primary Button' }} />

<Story name="Secondary" args={{ variant: 'secondary', children: 'Secondary Button' }} />

<Story name="Danger" args={{ variant: 'danger', children: 'Danger Button' }} />

<Story name="Ghost" args={{ variant: 'ghost', children: 'Ghost Button' }} />

<Story name="Link" args={{ variant: 'link', children: 'Link Button' }} />

<Story name="Outline" args={{ variant: 'outline', children: 'Outline Button' }} />

<Story name="Small" args={{ size: 'sm', children: 'Small Button' }} />

<Story name="Medium" args={{ size: 'md', children: 'Medium Button' }} />

<Story name="Large" args={{ size: 'lg', children: 'Large Button' }} />

<Story name="Full Width" args={{ fullWidth: true, children: 'Full Width Button' }} />

<Story name="Disabled" args={{ disabled: true, children: 'Disabled Button' }} />

<Story name="Loading" args={{ loading: true, children: 'Loading Button' }} />

<Story name="Left Icon" args={{ leftIcon: Pencil, children: 'Edit' }} />

<Story name="Right Icon" args={{ rightIcon: AlertCircle, children: 'Alert' }} />

<Story name="Icon Button" args={{ size: 'icon', leftIcon: Loader2 }} />
