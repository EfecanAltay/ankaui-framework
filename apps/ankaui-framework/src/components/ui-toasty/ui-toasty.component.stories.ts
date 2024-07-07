import type { Meta, StoryObj } from '@storybook/angular';
import { UIToastyComponent } from './ui-toasty.component';

import { within } from '@storybook/testing-library';

const meta: Meta<UIToastyComponent> = {
  component: UIToastyComponent,
  title: 'UIToasty',
};
export default meta;
type Story = StoryObj<UIToastyComponent>;

export const Primary: Story = {
  args: {
  },
  argTypes :{
  },
};
