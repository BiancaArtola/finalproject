import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchaPageRoutingModule } from './cancha-routing.module';

import { CanchaPage } from './cancha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanchaPageRoutingModule
  ],
  declarations: [CanchaPage]
})
export class CanchaPageModule {}
