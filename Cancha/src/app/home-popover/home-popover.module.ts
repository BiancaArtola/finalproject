import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePopoverPageRoutingModule } from './home-popover-routing.module';

import { HomePopoverPage } from './home-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePopoverPageRoutingModule
  ],
  declarations: [HomePopoverPage]
})
export class HomePopoverPageModule {}
