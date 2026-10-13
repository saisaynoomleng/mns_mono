import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Shared/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        description: 'Logo Text',
      },
    },
  },

  args: {},
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Font size of the logo',
          detail: `sm: 'text-fs-500 md:text-fs-600',
                    md: 'text-fs-600 md:text-fs-700',
                    lg: 'text-fs-800 md:text-fs-900',`,
        },
      },
    },

    fullText: {
      control: 'boolean',
      description: 'Whether to have full text or just initial',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
