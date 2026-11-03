import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardWidgetTable } from './DashboardWidgetTable';

const meta: Meta<typeof DashboardWidgetTable> = {
  title: 'DashboardWidgets/Table',
  component: DashboardWidgetTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: Table Widget',
      },
    },
  },

  args: {
    title: 'leads',
    headers: ['users', 'proposal', 'date', 'status'],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
