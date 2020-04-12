import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeformPage } from './homeform.page';

const routes: Routes = [
  {
    path: '',
    component: HomeformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeformPageRoutingModule {}
