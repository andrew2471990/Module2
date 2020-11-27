import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDatePageRoutingModule } from './add-date-routing.module';

import { AddDatePage } from './add-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDatePageRoutingModule
  ],
  declarations: [AddDatePage]
})
export class AddDatePageModule {}
