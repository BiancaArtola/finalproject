import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuth } from 'src/services/FirebaseAuth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  myForm: FormGroup;

  constructor(private storage: Storage, private router: Router, private toastController: ToastController,
    private modalController: ModalController, public formBuilder: FormBuilder, private firebaseAuth: FirebaseAuth,
    private alertController: AlertController) {
    this.myForm = this.createMyForm();
  }

  async register() {
    if (this.myForm.valid) {
      if (!this.checkPasswords()) {
        var name = this.myForm.value.nombre + " " + this.myForm.value.apellido;
        console.log(name);
        
        this.firebaseAuth.signupUser(this.myForm.value.usuario, this.myForm.value.password, name).then(
          () => {
            this.goHome();
            this.showMessage("Bienvenido", "El usuario se ha creado con exito");
          },
          (error) => {
            this.showMessage("Ocurrio un error", error.message);
          })
      }
      else
        this.showMessage("Ocurrio un error", "Las contraseñas no coinciden");
    }
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
