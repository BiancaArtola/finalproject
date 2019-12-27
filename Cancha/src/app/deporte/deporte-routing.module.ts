import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeportePage } from './deporte.page';

const routes: Routes = [
  {
    path: '',
    component: DeportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeportePageRoutingModule {}
