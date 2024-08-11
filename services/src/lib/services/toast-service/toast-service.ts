import { Injectable } from "@angular/core";

export interface ToastInfo {
  header: string;
  body: string;
  color?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastyService {
  toasts: ToastInfo[] = [];
  toastBodyHeight = 0;
  color?: string;

  show(header: string, body: string, color?: string) {
    this.toasts.push({ header, body, color });
  }

  info(header: string, body: string) {
    this.toasts.push({ header, body, color: "darkblue" });
  }

  success(header: string, body: string) {
    this.toasts.push({ header, body, color: "darkgreen" });
  }

  error(header: string, body: string) {
    this.toasts.push({ header, body, color: "red" });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}