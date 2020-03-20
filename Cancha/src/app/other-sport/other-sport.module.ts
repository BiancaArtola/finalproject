import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherSportPageRoutingModule } from './other-sport-routing.module';

import { OtherSportPage } from './other-sport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherSportPageRoutingModule
  ],
  declarations: [OtherSportPage]
})
export class OtherSportPageModule {}
