import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeformPageRoutingModule } from './homeform-routing.module';

import { HomeformPage } from './homeform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeformPageRoutingModule
  ],
  declarations: [HomeformPage]
})
export class HomeformPageModule {}
