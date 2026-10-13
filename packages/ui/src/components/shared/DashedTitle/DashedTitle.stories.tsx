import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashedTitle } from './DashedTitle';
import { expect } from 'storybook/test';

const meta: Meta<typeof DashedTitle> = {
  title: 'Components/Shared/DashedTitle',
  component: DashedTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        description: 'Subtitle with Dashed',
      },
    },
  },

  args: {
    label: 'contact',
  },

  argTypes: {
    label: {
      control: 'text',
      description: 'Text content',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const p = canvas.getByRole('paragraph');

    await expect(p).toBeInTheDocument();
    await expect(p).toHaveTextContent('contact');
  },
};
