import { Component, inject, Signal } from '@angular/core';
import { INestedMenu } from 'app/core/auth/nested-menu.dto';
import { MenuService } from './menu.service';
import { RouterModule } from '@angular/router';
import SharedModule from 'app/shared/shared.module';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'creatip-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  imports: [RouterModule, SharedModule],
})
export class SideMenuComponent {
private readonly menuService = inject(MenuService);
private readonly sidebarService = inject(SidebarService);

  readonly menu: Signal<INestedMenu[] | null> = this.menuService.trackMenu();
  readonly open = this.sidebarService.trackOpen();

  // track expanded parent nodes by a generated key (parentPath + index)
  private readonly expanded = new Set<string>();

  toggle(key: string): void {
    if (!key) {
      return;
    }
    if (this.expanded.has(key)) {
      this.expanded.delete(key);
    } else {
      this.expanded.add(key);
    }
  }

  isExpanded(key: string): boolean {
    return !!key && this.expanded.has(key);
  }

  // convenience to close sidebar after navigation
  closeSidebar(): void {
    this.sidebarService.close();
  }
  
}
