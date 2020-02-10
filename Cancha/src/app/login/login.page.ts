import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  myForm: FormGroup;
  usuario: string;

  constructor(private router: Router, private modalController: ModalController, private firebaseAuth: FirebaseAuth,
    public formBuilder: FormBuilder, public loadingController: LoadingController,
    private storage: Storage, private alertController: AlertController) {
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
    // const loading = await this.loadingController.create({
    //   translucent: true
    // });
    // await loading.present();
    console.log(" nombre ", this.myForm.value.usuario, " pass ", this.myForm.value.password);

    this.firebaseAuth.loginUser(this.myForm.value.usuario, this.myForm.value.password).then(
      () => {
        this.storage.set('user', this.usuario);
        this.router.navigate(['/home']).then(() => {
          //loading.dismiss();
        });
      }, (error) => {
        this.showMessage("Ocurrio un error.", error.message);
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

}
