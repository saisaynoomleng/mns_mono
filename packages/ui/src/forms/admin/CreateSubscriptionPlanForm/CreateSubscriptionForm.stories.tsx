import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateSubscriptionForm } from './CreateSubscriptionForm';
import { mockFormAction, mockSubscriptionServiceData } from '#lib/data';
import { expect, screen } from 'storybook/test';

const meta: Meta<typeof CreateSubscriptionForm> = {
  title: 'Forms/Admin/CreateSubscriptionForm',
  component: CreateSubscriptionForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Subscription Plan Form',
      },
    },
  },

  args: {
    action: mockFormAction,
    services: mockSubscriptionServiceData,
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
          summary: "Current main mns.'s services",
          detail: `
            name: string;
            id: string;
          `,
        },
      },
    },

    action: {
      control: false,
      description: 'subscriptionRouter.create TRPC action',
    },

    isPending: {
      control: 'boolean',
      description: 'Pending state of the form',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const name = canvas.getByLabelText(/plan name/i);
    const sanityId = canvas.getByLabelText(/sanity id/i);
    const service = canvas.getByRole('combobox');
    const price = canvas.getByLabelText(/price per month/i);
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(sanityId).toBeInTheDocument();
    await expect(service).toBeInTheDocument();
    await expect(price).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'Starter');
    await userEvent.type(sanityId, crypto.randomUUID());
    await userEvent.click(service);
    await userEvent.click(screen.getByRole('option', { name: /enterprise/i }));
    await userEvent.type(price, '10000');
    await userEvent.click(submit);

    await expect(args.action).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Starter',
        sanityId: expect.stringContaining('-'),
        serviceId: args.services[1]?.id,
        status: 'active',
        pricePerMonthInCents: 10000,
      }),
    );
  },
};
