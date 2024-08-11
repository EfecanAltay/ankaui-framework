import type { Meta, StoryObj } from '@storybook/angular';
import { UILoaderComponent } from './ui-loader.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UILoaderComponent> = {
  component: UILoaderComponent,
  title: 'UILoader',
};
export default meta;
type Story = StoryObj<UILoaderComponent>;

export const Primary: Story = {
  args: {
    IsShowing : true,
    ShowingText : "Lütfen Bekleyiniz..."
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
