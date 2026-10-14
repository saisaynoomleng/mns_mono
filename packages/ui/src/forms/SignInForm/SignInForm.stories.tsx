import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { SignInForm } from './SignInForm';
import { mockFormAction } from '#lib/data';

const meta: Meta<typeof SignInForm> = {
  title: 'Forms/SignInForms',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sign in form for mns apps',
      },
    },
  },

  args: {},
  argTypes: {
    action: {
      control: false,
      description: 'Sign in action to be rendered in next.js',
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
  args: {
    forgetCTA: {
      label: 'Forget Password',
      href: '#',
    },
    signUpCTA: {
      label: 'Not a member yet? Sign Up',
      href: '#',
    },
  },
  render: (args) => (
    <SignInForm
      {...args}
      renderForget={(props) => <a href={props.href}>{props.label}</a>}
      renderSignUp={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
};
