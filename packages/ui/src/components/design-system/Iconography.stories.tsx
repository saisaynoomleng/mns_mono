import type { Meta, StoryObj } from '@storybook/react-vite';
import { Iconography } from './Iconography';

const meta: Meta<typeof Iconography> = {
  title: 'DesignSystem/Iconography',
  component: Iconography,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Iconography used in this app',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
