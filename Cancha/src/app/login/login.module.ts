import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RegisterPageModule } from '../register/register.module';
import { ForgotPasswordPageModule } from '../forgot-password/forgot-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RegisterPageModule,
    ForgotPasswordPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
