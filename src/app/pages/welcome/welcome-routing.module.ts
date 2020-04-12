import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePage } from './welcome.page';

const routes: Routes = [

  {
      path: '',
      component: WelcomePage,
      children: [
          { path: 'login', loadChildren: '../login/login.module#LoginPageModule'},
          { path: 'register', loadChildren: '../register/register.module#RegisterPageModule'}
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
