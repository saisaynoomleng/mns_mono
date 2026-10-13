import type { Meta, StoryObj } from '@storybook/react-vite';
import { SubmitButton } from './SubmitButton';

const meta: Meta<typeof SubmitButton> = {
  title: 'Components/Shared/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        description: 'Logo Text',
      },
    },
  },

  args: {
    label: 'Submit',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    label: {
      control: 'text',
      description: 'Button Submit label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
