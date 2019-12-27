import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeportePageRoutingModule } from './deporte-routing.module';

import { DeportePage } from './deporte.page';
import { CanchaPageModule } from '../cancha/cancha.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportePageRoutingModule,
    CanchaPageModule
  ],
  declarations: [DeportePage]
})
export class DeportePageModule {}
