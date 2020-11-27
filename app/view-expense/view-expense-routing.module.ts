import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExpensePage } from './view-expense.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExpensePage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'view-expense',
    loadChildren: () => import('./view-expense/view-expense.module').then( m => m.ViewExpensePageModule)
  },
  {
    path: 'view-receipt',
    loadChildren: () => import('./view-receipt/view-receipt.module').then( m => m.ViewReceiptPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewExpensePageRoutingModule {}
