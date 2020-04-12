import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTablePage } from './data-table.page';

const routes: Routes = [
  {
    path: '',
    component: DataTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTablePageRoutingModule {}
