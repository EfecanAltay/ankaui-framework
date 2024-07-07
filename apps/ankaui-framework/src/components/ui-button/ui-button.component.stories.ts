import type { Meta, StoryObj } from '@storybook/angular';
import { UIButtonComponent } from './ui-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UIButtonComponent> = {
  component: UIButtonComponent,
  title: 'UIButton',
};
export default meta;
type Story = StoryObj<UIButtonComponent>;

export const Primary: Story = {
  args: {
    Title : 'Title',
    IsDisabled : false,
    IsLoading : false,
    IsLoadingText : 'Lütfen Bekleyin...',
    Name : 'Name',
    Style : "btn-primary",
    Type : 'button',
  },
  argTypes :{
    IsLoadingText :{
      control: 'text',
      if: { arg: 'IsLoading', truthy: true },
    },
    Style : {
      options: ["btn-primary", "btn-secondary", "btn-success","btn-danger","btn-warning",
        "btn-info", "btn-light", "btn-dark", "btn-link"],
      control: { type: 'select' },
    },
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
