import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanchaPage } from './cancha.page';

const routes: Routes = [
  {
    path: '',
    component: CanchaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanchaPageRoutingModule {}
