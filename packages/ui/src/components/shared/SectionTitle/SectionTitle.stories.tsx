import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';
import { DashedTitle } from '../DashedTitle';
import { expect } from 'storybook/test';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Shared/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Main title for each section on the web pages',
      },
    },
  },

  args: {
    size: 'md',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    as: {
      control: 'radio',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Different Heading tags',
    },

    children: {
      control: 'text',
      description: 'Title text content',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Different size variants of the title',
          detail: `
            sm: 'text-fs-500 md:text-fs-600',
            md: 'text-fs-600 md:text-fs-700',
            lg: 'text-fs-700 md:text-fs-800',
          `,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <>
      <DashedTitle label="contact" />
      <SectionTitle {...args}>we can help</SectionTitle>
    </>
  ),
};

export const Heading5: Story = {
  args: {
    as: 'h5',
  },
  render: (args) => (
    <>
      <DashedTitle label="contact" />
      <SectionTitle {...args}>we can help</SectionTitle>
    </>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByText(/we can help/i);

    await expect(heading).toBeInTheDocument();
    await expect(heading?.tagName).toBe('H5');
  },
};
