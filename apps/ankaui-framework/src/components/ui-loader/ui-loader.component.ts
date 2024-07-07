import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader-service/loader-service';
import { LoaderData } from '../../data/loader-data';

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
