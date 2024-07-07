import { ContextActionData } from "./contextaction-data";

export class ContextMenuData {

  public UIItem: unknown;
  public ShowingContextData: ContextActionData[];
  public PositionXY = [0, 0];

  /**
   * Constructor
   */
  constructor(uiItem: unknown, positionEvent: PointerEvent, data: ContextActionData[]) {
    this.UIItem = uiItem;
    this.PositionXY = [positionEvent.clientX, positionEvent.clientY];
    this.ShowingContextData = data;
  }
}