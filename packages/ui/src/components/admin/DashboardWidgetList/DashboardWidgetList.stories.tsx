import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardWidgetList } from './DashboardWidgetList';

const meta: Meta<typeof DashboardWidgetList> = {
  title: 'DashboardWidgets/List',
  component: DashboardWidgetList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: List Widget',
      },
    },
  },

  args: {
    title: 'All services',
    footer: 'Footer',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DashboardWidgetList
      {...args}
      listItems={Array.from({ length: 10 }, (_, i) => (
        <p key={i}>
          {i + 1} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, aut?
        </p>
      ))}
    />
  ),
};

export const NoFooter: Story = {
  args: {
    footer: '',
  },
  render: (args) => (
    <DashboardWidgetList
      {...args}
      listItems={Array.from({ length: 10 }, (_, i) => (
        <p key={i}>
          {i + 1} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, aut?
        </p>
      ))}
    />
  ),
};
