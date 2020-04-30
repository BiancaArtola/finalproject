import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaInformationPageRoutingModule } from './reserva-information-routing.module';

import { ReservaInformationPage } from './reserva-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaInformationPageRoutingModule
  ],
  declarations: [ReservaInformationPage]
})
export class ReservaInformationPageModule {}
