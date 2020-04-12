import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataTablePageRoutingModule } from './data-table-routing.module';

import { DataTablePage } from './data-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTablePageRoutingModule
  ],
  declarations: [DataTablePage]
})
export class DataTablePageModule {}
