import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController, Platform, Events, MenuController } from '@ionic/angular';
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
  public subscription;

  constructor(public router: Router, public modalController: ModalController, public menuCtrl: MenuController,
    public authenticationService: AuthenticationService, public events: Events,
    public formBuilder: FormBuilder, public loadingController: LoadingController,
    public storage: Storage, public alertController: AlertController, public platform: Platform) {
    this.storage.set('user', null);
    this.myForm = this.createMyForm();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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
    const loading = await this.loadingController.create();
    await loading.present();
    this.authenticationService.loginUser(this.myForm.value.usuario, this.myForm.value.password).then(
      () => {
        this.storage.set('user', this.usuario);
        this.contrasena = null;
        this.usuario = null;
        this.events.publish('user:login', null);
        this.router.navigate(['/home']).then(() => this.loadingController.dismiss())
      }, (error) => {
        this.manageError(error);
        this.loadingController.dismiss();
        this.contrasena = null;
      });
  }

  manageError(error) {
    var errorCode = error.code;
    if (errorCode === 'auth/wrong-password')
      this.showMessage("Ocurrio un error.", "La contraseña ingresada es incorrecta.");
    else if (errorCode === 'auth/user-not-found')
      this.showMessage("Ocurrio un error.", "No existe usuario registrado con ese mail. Por favor, cree una nueva cuenta.");
    else if (errorCode === 'auth/invalid-email')
      this.showMessage("Ocurrio un error.", "El email ingresado no es válido.");
      else if (errorCode === 'auth/user-disabled')
      this.showMessage("Ocurrio un error.", "El usuario correspondiente a este email ha sido deshabilitado.");
    else
      this.showMessage("Ocurrio un error.", "Chequee la conexión a internet e intente nuevamente.");
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
