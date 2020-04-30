import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  myForm: FormGroup;
  contrasena1; contrasena2;

  constructor(private storage: Storage, private router: Router, private toastController: ToastController,
    private modalController: ModalController, public formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private alertController: AlertController, private loadingController: LoadingController) {
    this.myForm = this.createMyForm();
  }

  async register() {
    if (this.myForm.valid) {
      if (!this.checkPasswords()) {
        this.presentLoading();
        var name = this.myForm.value.nombre + " " + this.myForm.value.apellido;

        this.authenticationService.signupUser(this.myForm.value.usuario, this.myForm.value.password, name).then(
          () => {
            this.goHome();
            this.loadingController.dismiss().then(() => this.showMessage("¡Bienvenido!", "El usuario se ha creado con éxito."))
          },
          (error) => {
            this.showMessage("Ocurrio un error", error.message);
          })
      }
      else {
        this.showMessage("Ocurrio un error", "Las contraseñas no coinciden").then(() => {
          this.contrasena1 = null;
          this.contrasena2 = null;
        })

      }
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create();
    await loading.present();
  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goHome() {
    this.storage.set('user', this.myForm.value.nombre);
    this.router.navigate(['/home']);
    this.modalController.dismiss();
  }

  goBack() {
    this.modalController.dismiss();
  }

  /**
   * Se aplican todos los requisitos para los campos de registro
   */
  private createMyForm() {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
      confirmPass: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])]
    });
  }


  /**
   * Chequea que las contraseñas sean iguales
   */
  checkPasswords() {
    let pass = this.myForm.get('password').value;
    let confirmPass = this.myForm.get('confirmPass').value;
    return pass === confirmPass ? null : { notSame: true }
  }

}
