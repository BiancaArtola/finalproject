import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateAndHourPage } from './date-and-hour.page';

const routes: Routes = [
  {
    path: '',
    component: DateAndHourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateAndHourPageRoutingModule {}
