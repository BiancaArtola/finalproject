import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  myForm: FormGroup;
  usuario: string;
  contrasena;

  constructor(private router: Router, private modalController: ModalController, 
    private authenticationService: AuthenticationService,
    public formBuilder: FormBuilder, public loadingController: LoadingController,
    private storage: Storage, private alertController: AlertController, private platform: Platform) {
    this.storage.set('user', null);
    this.myForm = this.createMyForm();
  }


  createMyForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  async goHome() {
    this.presentLoading();
    this.authenticationService.loginUser(this.myForm.value.usuario, this.myForm.value.password).then(
      () => {
        this.storage.set('user', this.usuario);
        this.router.navigate(['/home']).then(() => this.loadingController.dismiss())
      }, (error) => {
        this.showMessage("Ocurrio un error.", error.message);
        this.loadingController.dismiss();
        this.contrasena = null;
      })

  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async openRegister() {
    this.createModal(RegisterPage);
  }

  goToForgotPassword() {
    this.createModal(ForgotPasswordPage);
  }

  async createModal(component) {
    const modal = await this.modalController.create({
      component: component
    });
    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create();
    await loading.present();
  }
}
