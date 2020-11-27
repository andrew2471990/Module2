import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDatePage } from './add-date.page';

const routes: Routes = [
  {
    path: '',
    component: AddDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDatePageRoutingModule {}
