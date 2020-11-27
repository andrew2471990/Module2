import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpensePage } from './add-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensePage
  },
  {
    path: 'add-picture',
    loadChildren: () => import('./add-picture/add-picture.module').then( m => m.AddPicturePageModule)
  },
  {
    path: 'add-amount',
    loadChildren: () => import('./add-amount/add-amount.module').then( m => m.AddAmountPageModule)
  },
  {
    path: 'add-date',
    loadChildren: () => import('./add-date/add-date.module').then( m => m.AddDatePageModule)
  },
  {
    path: 'add-info',
    loadChildren: () => import('./add-info/add-info.module').then( m => m.AddInfoPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpensePageRoutingModule {}
