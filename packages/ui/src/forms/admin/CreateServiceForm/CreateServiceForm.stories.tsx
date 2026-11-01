import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateServiceForm } from './CreateServiceForm';
import { mockFormAction } from '#lib/data';
import { expect } from 'storybook/test';

const meta: Meta<typeof CreateServiceForm> = {
  title: 'Forms/Admin/CreateServiceForm',
  component: CreateServiceForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Service Form',
      },
    },
  },

  args: {
    action: mockFormAction,
    isPending: false,
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classess',
    },

    action: {
      control: false,
      description: 'TRPC serviceRouter.create action',
    },

    isPending: {
      control: 'boolean',
      description: 'Submission Pending state for the TRPC action',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const name = canvas.getByLabelText(/service name/i);
    const sanityId = canvas.getByLabelText(/sanity id/i);
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(sanityId).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'Onboarding');
    await userEvent.type(sanityId, 'asdfbasd2321asdfhe');
    await userEvent.click(submit);

    await expect(args.action).toHaveBeenCalledWith({
      name: 'Onboarding',
      sanityId: 'asdfbasd2321asdfhe',
      status: 'active',
    });
  },
};
