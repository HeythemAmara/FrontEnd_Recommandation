import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {AuthService} from "../demo/service/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    modelAdmin: any[] = [];
    role: string | null = '' ;

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {
      this.authService.fastload();
      this.role = this.authService.role;
      this.model = [
        {
          label: 'Orange',
          items: [
            { label: 'Primini', icon: 'pi pi-fw pi-clone', routerLink: ['/Orange/phones'] }
          ]
        },
      ];
      this.modelAdmin = [
        {
          label: 'Orange',
          items: [
            { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/Orange/users'] },
            { label: 'Primini', icon: 'pi pi-fw pi-clone', routerLink: ['/Orange/phones'] }
          ]
        },
      ];
    }
}
