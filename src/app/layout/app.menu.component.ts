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
            { label: 'Phones', icon: 'pi pi-fw pi-clone', routerLink: ['/Orange/phones'] },
            { label: 'Orders', icon: 'pi pi-fw pi-cart-arrow-down', routerLink: ['/Orange/carts'] }
          ]
        },
      ];
      this.modelAdmin = [
        {
          label: 'Orange',
          items: [
            { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/Orange/users'] },
            { label: 'Phones', icon: 'pi pi-fw pi-clone', routerLink: ['/Orange/phones'] },
            { label: 'Orders', icon: 'pi pi-fw pi-cart-arrow-down', routerLink: ['/Orange/carts'] }
          ]
        },
      ];
    }
}
