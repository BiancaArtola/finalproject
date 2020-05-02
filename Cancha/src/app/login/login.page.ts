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
  private subscription;

  constructor(private router: Router, private modalController: ModalController, public menuCtrl: MenuController,
    private authenticationService: AuthenticationService, public events: Events,
    public formBuilder: FormBuilder, public loadingController: LoadingController,
    private storage: Storage, private alertController: AlertController, private platform: Platform) {
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
    this.presentLoading();
    this.authenticationService.loginUser(this.myForm.value.usuario, this.myForm.value.password).then(
      () => {
        this.storage.set('user', this.usuario);
        this.contrasena = null;
        this.usuario = null;
        this.events.publish('user:login', null);

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
