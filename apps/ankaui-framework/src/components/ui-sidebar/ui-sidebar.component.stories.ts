import type { Meta, StoryObj } from '@storybook/angular';
import { UISidebarComponent } from './ui-sidebar.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UISidebarComponent> = {
  component: UISidebarComponent,
  title: 'UISidebar',
};
export default meta;
type Story = StoryObj<UISidebarComponent>;

export const Primary: Story = {
  args: {
  },
  argTypes :{
  }
};