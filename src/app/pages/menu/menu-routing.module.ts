import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children:[
      { path: 'home', loadChildren: '../home/home.module#HomePageModule'},
      { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule'},
      { path: 'message', loadChildren: '../message/message.module#MessagePageModule'},
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule'},
      { path: 'homeform', loadChildren: '../homeform/homeform.module#HomeformPageModule'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
