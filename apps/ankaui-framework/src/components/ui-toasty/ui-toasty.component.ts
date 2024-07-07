import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyService } from '../../services/toast-service/toast-service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ui-toasty',
  standalone: true,
  imports: [CommonModule,NgbToast],
  templateUrl: './ui-toasty.component.html',
  styleUrl: './ui-toasty.component.css',
})
export class UIToastyComponent {
  public _srvToasty: ToastyService;
  /**
   *
   */
  constructor(private srvToastyService: ToastyService) {
    this._srvToasty = srvToastyService;
  }

  public AddToastyMessage(){
      this._srvToasty.info("TEST","test");
  }
}
