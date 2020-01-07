import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeportePageRoutingModule } from './deporte-routing.module';

import { DeportePage } from './deporte.page';
import { CanchaPageModule } from '../cancha/cancha.module';
import { MapsPageModule } from '../maps/maps.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportePageRoutingModule,
    CanchaPageModule,
    MapsPageModule
  ],
  declarations: [DeportePage]
})
export class DeportePageModule {}
