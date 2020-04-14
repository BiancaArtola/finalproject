import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchaPageRoutingModule } from './cancha-routing.module';

import { CanchaPage } from './cancha.page';
// import { ReservasPageModule } from '../reservas/reservas.module';

import { CommentsPageModule } from '../comments/comments.module';
import { PayPageModule } from '../pay/pay.module';
import { DateAndHourPageModule } from '../date-and-hour/date-and-hour.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ReservasPageModule,
    CommentsPageModule,
    PayPageModule,
    DateAndHourPageModule,
    CanchaPageRoutingModule
  ],
  declarations: [CanchaPage]
})
export class CanchaPageModule {}
