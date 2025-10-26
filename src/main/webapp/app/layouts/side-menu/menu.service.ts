import { Injectable, inject, signal, Signal } from '@angular/core';
import { INestedMenu } from 'app/core/auth/nested-menu.dto';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly stateStorage = inject(StateStorageService);
  private readonly menuSignal = signal<INestedMenu[] | null>(null);

  trackMenu(): Signal<INestedMenu[] | null> {
    return this.menuSignal.asReadonly();
  }

  setMenu(menu: INestedMenu[] | null, persist = false): void {
    this.menuSignal.set(menu);
    if (persist) {
      try {
        this.stateStorage.storeMenu(JSON.stringify(menu ?? []));
      } catch {
        // ignore serialization errors
      }
    }
  }

  restoreFromStorage(): void {
    const raw = this.stateStorage.getMenu();
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as INestedMenu[];
        this.menuSignal.set(parsed);
      } catch {
        this.menuSignal.set(null);
      }
    }
  }
}