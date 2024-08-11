import { EventEmitter, Injectable } from "@angular/core";
import { LoaderData } from '@ankaui-framework/data';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  public IsShowing : boolean;
  public ShowingText: string;
  public ShowingTextCallback = new EventEmitter<LoaderData>();
  /**
   *
   */
  constructor() {
    this.IsShowing = false;
    this.ShowingText = "Lütfen Bekleyin...";
  }
}