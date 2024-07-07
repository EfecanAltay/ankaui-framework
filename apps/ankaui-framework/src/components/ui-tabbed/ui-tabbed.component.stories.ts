import type { Meta, StoryObj } from '@storybook/angular';
import { UITabbedComponent } from './ui-tabbed.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UITabbedComponent> = {
  component: UITabbedComponent,
  title: 'UITabbed',
};
export default meta;
type Story = StoryObj<UITabbedComponent>;

export const Primary: Story = {
  args: {
    Title : 'Tapped',
    IsDisabled : false,
    Name : 'Name',
    IsRequired : false,
    IsEnableValidMessage : true,
    InValidText : 'Valid'
  },
  argTypes :{
    Type : {
      options: ["none","button","submit"],
      control: { type: 'select' },
    },
  }
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/nx-welcome works!/gi)).toBeTruthy();
  },
};
