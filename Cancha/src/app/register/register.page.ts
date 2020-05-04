import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController, LoadingController, Events } from '@ionic/angular';
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

  constructor(public storage: Storage, public router: Router, public toastController: ToastController,
    public modalController: ModalController, public formBuilder: FormBuilder, public authenticationService: AuthenticationService,
    public alertController: AlertController, public loadingController: LoadingController,
    public events: Events) {
    this.myForm = this.createMyForm();
  }

  async register() {
    if (this.myForm.valid) {
      if (!this.checkPasswords()) {
        const loading = await this.loadingController.create(); //dejarlo asi porque sino no anda sin conexion
        await loading.present();

        var name = this.myForm.value.nombre + " " + this.myForm.value.apellido;

        this.authenticationService.signupUser(this.myForm.value.usuario, this.myForm.value.password, name)
          .then(
            () => {
              this.events.publish('user:created', name);
              this.goHome();
              this.loadingController.dismiss().then(() => this.showMessage("¡Bienvenido!", "El usuario se ha creado con éxito."))
            },
            (error) => {
              this.loadingController.dismiss()
              this.manageError(error);
              this.contrasena1 = null;
              this.contrasena2 = null;
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

  manageError(error) {
    var errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use')
      this.showMessage("Ocurrio un error.", "Ya existe una cuenta para el email ingresado. Por favor, pruebe con otro email o recupere su contraseña.");
    else if (errorCode === 'auth/operation-not-allowed')
      this.showMessage("Ocurrio un error.", "La operación no esta permitida.");
    else if (errorCode === 'auth/invalid-email')
      this.showMessage("Ocurrio un error.", "El email ingresado no es válido.");
    else if (errorCode === 'auth/weak-password')
      this.showMessage("Ocurrio un error.", "La contraseña ingresada no es segura. Pruebe con otra combinación.");
    else
      this.showMessage("Ocurrio un error.", "Chequee la conexión a internet e intente nuevamente.");
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
  public createMyForm() {
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
