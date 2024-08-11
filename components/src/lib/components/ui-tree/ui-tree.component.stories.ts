import type { Meta, StoryObj } from '@storybook/angular';
import { UITreeComponent } from './ui-tree.component';
import { UITreeHelper } from './ui-tree.helper';
import { UITreeItemFileType } from './tree-item/ui-tree-item.data';

const meta: Meta<UITreeComponent> = {
  component: UITreeComponent,
  title: 'UITree',
};
export default meta;
type Story = StoryObj<UITreeComponent>;

export const Primary: Story = {
  args: {
      ItemList: testMenu()
  },
  argTypes :{
  
  }
};

function testMenu(){
  const menuItemList = [];
  const item0 = [];
  item0.push(UITreeHelper.CreateFile("GET0 Request", UITreeItemFileType.RESTAPI_POST));
  item0.push(UITreeHelper.CreateFile("POST0 Request", UITreeItemFileType.RESTAPI_POST));
  item0.push(UITreeHelper.CreateFile("PUSH0 Request", UITreeItemFileType.RESTAPI_POST));
  item0.push(UITreeHelper.CreateFile("DELETE0 Request", UITreeItemFileType.RESTAPI_POST));
  const item = UITreeHelper.CreateFolder("Examples", item0, true);
  menuItemList.push(item);

  const item1 = [];
  item1.push(UITreeHelper.CreateFile("GET1 Request", UITreeItemFileType.RESTAPI_POST));
  item1.push(UITreeHelper.CreateFile("POST1 Request", UITreeItemFileType.RESTAPI_POST));
  item1.push(UITreeHelper.CreateFile("PUSH1 Request", UITreeItemFileType.RESTAPI_POST));
  item1.push(UITreeHelper.CreateFile("DELETE1 Request", UITreeItemFileType.RESTAPI_POST));
  const item2 = UITreeHelper.CreateFolder("Examples1", item1, true);
  menuItemList.push(item2);
  const item3 = [];
  item3.push(UITreeHelper.CreateFile("GET2 Request", UITreeItemFileType.RESTAPI_POST));
  item3.push(UITreeHelper.CreateFile("POST2 Request", UITreeItemFileType.RESTAPI_POST));
  item3.push(UITreeHelper.CreateFile("PUSH2 Request", UITreeItemFileType.RESTAPI_POST));
  item3.push(UITreeHelper.CreateFile("DELETE2 Request", UITreeItemFileType.RESTAPI_POST));
  const item4 = UITreeHelper.CreateFolder("Examples2", item3, true);
  menuItemList.push(item4);
  return menuItemList;
}