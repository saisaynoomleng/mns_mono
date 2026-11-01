import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';

import '@fontsource-variable/fraunces';
import '@fontsource-variable/sora';
import '@fontsource-variable/playpen-sans';

import './fonts.css';

import { Toaster } from '../src/components/ui/sonner';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />

        <Toaster richColors closeButton position="bottom-center" />
      </>
    ),
  ],
};

export default preview;
