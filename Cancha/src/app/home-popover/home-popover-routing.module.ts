import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePopoverPage } from './home-popover.page';

const routes: Routes = [
  {
    path: '',
    component: HomePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePopoverPageRoutingModule {}
