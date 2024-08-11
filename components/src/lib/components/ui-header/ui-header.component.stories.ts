import type { Meta, StoryObj } from '@storybook/angular';
import { UIHeaderComponent } from './ui-header.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UIHeaderComponent> = {
  component: UIHeaderComponent,
  title: 'UIHeader',
};
export default meta;
type Story = StoryObj<UIHeaderComponent>;

export const Primary: Story = {
  args: {
    IsSigned: false,
    MenuButtonIsVisible : false,
  },
  argTypes :{
  }
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/nx-welcome works!/gi)).toBeTruthy();
  },
};
