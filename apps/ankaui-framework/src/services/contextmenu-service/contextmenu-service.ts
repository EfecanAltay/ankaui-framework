import { EventEmitter, Injectable } from "@angular/core";
import { ContextMenuData } from "../../data/contextmenu-data";
import { ContextActionData } from "../../data/contextaction-data";

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  private _isShowing = false;
  public get IsShowing(): boolean {
    return this._isShowing;
  }
  public set IsShowing(val: boolean) {
    this._isShowing = val;
  }
  public OnShowingChange = new EventEmitter<ContextMenuData>();

  public Show(callingFunctionObject : unknown, pointerEvent: PointerEvent, dataList: ContextActionData[]) {
    this.IsShowing = true;
    this.OnShowingChange.emit(new ContextMenuData(callingFunctionObject, pointerEvent, dataList));
  }

  Hide() {
    this.IsShowing = false;
  }
}