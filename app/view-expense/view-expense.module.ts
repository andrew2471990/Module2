import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewExpensePageRoutingModule } from './view-expense-routing.module';

import { ViewExpensePage } from './view-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewExpensePageRoutingModule
  ],
  declarations: [ViewExpensePage]
})
export class ViewExpensePageModule {}
