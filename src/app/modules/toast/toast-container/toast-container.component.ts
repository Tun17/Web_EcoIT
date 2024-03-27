import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  host: { class: 'toast-container position-fixed p-3', style: 'top:10px; right: 5px; z-index: 1200' }
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnInit(): void {
  }

}
