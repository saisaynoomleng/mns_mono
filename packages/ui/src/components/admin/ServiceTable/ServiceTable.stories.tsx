import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceTable } from './ServiceTable';
import { AllServiceData } from '#lib/data';

const meta: Meta<typeof ServiceTable> = {
  title: 'Components/Admin/ServiceTable',
  component: ServiceTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "All mns.'s services display table",
      },
    },
  },

  args: {
    services: AllServiceData,
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    services: {
      control: false,
      table: {
        type: {
          summary: 'list of mns services',
          detail: `
            name: string;
            sanityId: string;
            status: 'active' | 'no_longer_available';
          `,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
