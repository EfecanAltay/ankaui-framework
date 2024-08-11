import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '@ankaui-framework/services';
import { LoaderData } from '@ankaui-framework/data';

@Component({
  selector: 'ui-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-loader.component.html',
  styleUrl: './ui-loader.component.css',
})
export class UILoaderComponent {

  public IsShowing = false;
  public ShowingText = "";

  /**
   *
   */
  constructor(private loaderService: LoaderService) {
    loaderService.ShowingTextCallback.subscribe((data: LoaderData)=>{
      this.IsShowing = data.IsShowing;
      this.ShowingText = data.ShowingText;
    });
  }
}
