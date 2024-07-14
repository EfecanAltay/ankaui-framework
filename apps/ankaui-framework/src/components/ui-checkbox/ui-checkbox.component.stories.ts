import type { Meta, StoryObj } from '@storybook/angular';
import { UICheckboxComponent } from './ui-checkbox.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UICheckboxComponent> = {
  component: UICheckboxComponent,
  title: 'UICheckbox',
};
export default meta;
type Story = StoryObj<UICheckboxComponent>;

export const Primary: Story = {
  args: {
    Title : 'CheckBox',
    IsDisable : false,
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
