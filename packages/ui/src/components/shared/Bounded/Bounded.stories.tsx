import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bounded } from './Bounded';
import { expect } from 'storybook/test';

const meta: Meta<typeof Bounded> = {
  title: 'Components/Shared/Bounded',
  component: Bounded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      component: {
        description: 'Component Wrapper, default to <section>',
      },
    },
  },

  args: {},
  argTypes: {
    as: {
      control: false,
      description: 'React Element Type, default to <section></section>',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    children: {
      control: false,
      description: 'React Node',
    },

    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Predefined horizontal padding',
          detail: ` 
            none: '',
            sm: 'px-4 md:px-6 lg:px-8',
            md: 'px-6 md:px-8 lg:px-10',
            lg: 'px-8 md:px-10 lg:px-12',`,
        },
      },
    },

    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Predefined vertical spacing',
          detail: ` 
            none: '',
            sm: 'space-y-4 md:space-y-6 lg:space-y-8',
            md: 'space-y-6 md:space-y-8 lg:space-y-10',
            lg: 'space-y-8 md:space-y-10 lg:space-y-12',`,
        },
      },
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'full'],
      table: {
        type: {
          summary: 'Maximum width of the wrapper',
          detail: `
            sm: 'max-w-4xl',
            md: 'max-w-7xl',
            full: 'max-w-none',
            `,
        },
      },
    },

    isCentered: {
      control: 'boolean',
      description: 'Whether the wrapper must be centered',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'none',
    size: 'full',
    spacing: 'none',
    isCentered: false,
  },

  render: (args) => (
    <Bounded {...args} padding="sm">
      <h1>Heading</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat quasi
        pariatur dolorum quo explicabo ut modi asperiores. Eligendi, alias
        voluptate.
      </p>
    </Bounded>
  ),
};

export const Main: Story = {
  args: {
    as: 'main',
    spacing: 'sm',
    padding: 'lg',
    isCentered: true,
    size: 'md',
  },
  render: (args) => (
    <Bounded {...args}>
      <h1>Main Heading</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
        molestias quidem obcaecati nisi, aliquid dolorum in maxime blanditiis
        officia eaque.
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');
    const para = canvas.getByRole('paragraph');
    const wrapper = para.parentElement;

    await expect(heading).toBeInTheDocument();
    await expect(para).toBeInTheDocument();
    await expect(wrapper?.tagName).toBe('MAIN');
  },
};
