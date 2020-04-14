import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateAndHourPageRoutingModule } from './date-and-hour-routing.module';

import { DateAndHourPage } from './date-and-hour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateAndHourPageRoutingModule
  ],
  declarations: [DateAndHourPage]
})
export class DateAndHourPageModule {}
