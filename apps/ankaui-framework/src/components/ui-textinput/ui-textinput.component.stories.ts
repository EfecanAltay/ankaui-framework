import type { Meta, StoryObj } from '@storybook/angular';
import { UITextInputComponent } from './ui-textinput.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UITextInputComponent> = {
  component: UITextInputComponent,
  title: 'UITextInput',
};
export default meta;
type Story = StoryObj<UITextInputComponent>;

export const Primary: Story = {
  args: {
    Title : 'Text Input Title',
    PlaceHoder :'Please Enter Text...',
    IsDisable : false,
    Name : 'Name',
    IsRequired : false,
    IsEnableValidMessage : true,
    InValidText : 'Valid',
    
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
