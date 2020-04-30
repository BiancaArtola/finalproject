import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaInformationPage } from './reserva-information.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaInformationPageRoutingModule {}
