import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherSportPage } from './other-sport.page';

const routes: Routes = [
  {
    path: '',
    component: OtherSportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherSportPageRoutingModule {}
