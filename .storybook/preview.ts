import type { Preview } from '@storybook/svelte'
import '../src/app.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
      ],
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#0f172a' }
      ],
      onChange: (theme) => {
        // Update the HTML class for the theme
        document.documentElement.classList.toggle('dark', theme.class === 'dark');
      }
    }
  },
};

export default preview;