import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/service/auth.guard';
import { DashboardusersComponent } from "./demo/components/dashboardusers/dashboardusers.component";
import {DashboardcartsComponent} from "./demo/components/dashboardCarts/dashboardcarts.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'Orange', component: AppLayoutComponent,
        children: [

          { path: 'phones', loadChildren: () => import('./demo/components/phones/phones.module').then(m => m.PhonesModule), canActivate: [AuthGuard], data: { expectedRoles: ['Admin', 'Employee'] } },
          { path: 'users', component: DashboardusersComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Admin'] } },
          { path: 'carts', component: DashboardcartsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['Admin', 'Employee'] } },
        ],
      },
      { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
      { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: 'notfound' },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
