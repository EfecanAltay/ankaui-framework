import type { Meta, StoryObj } from '@storybook/angular';
import { UIContextMenuComponent } from './ui-contextmenu.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ContextActionData } from '../../data/contextaction-data';

const meta: Meta<UIContextMenuComponent> = {
  component: UIContextMenuComponent,
  title: 'UIContextMenu',
};
export default meta;
type Story = StoryObj<UIContextMenuComponent>;

export const Primary: Story = {
  args: {
    Title : 'CheckBox',
    IsDisable : false,
    Name : 'Name',
    MenuList : [] 
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
