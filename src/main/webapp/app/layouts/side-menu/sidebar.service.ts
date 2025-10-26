import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly openSignal = signal<boolean>(false);

  open(): void {
    this.openSignal.set(true);
  }

  close(): void {
    this.openSignal.set(false);
  }

  toggle(): void {
    this.openSignal.update(v => !v);
  }

  trackOpen(): Signal<boolean> {
    return this.openSignal.asReadonly();
  }
}