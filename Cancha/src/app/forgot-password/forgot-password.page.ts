import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  private resetPasswordForm: FormGroup;
  private emailModel;

  constructor(private modalController: ModalController,  private alertController: AlertController, 
    public formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.resetPasswordForm = this.createForm();
  }


  createForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  resetPassword() {
    this.authenticationService.resetPassword(this.resetPasswordForm.value.email).then(() => {
      this.emailModel = null;
      this.showMessageAndDismiss("Revise su correo", "Se ha enviado un email para recuperar su contraseña.")
    })
    .catch((error)=>{
      this.showMessage("Este usuario no existe.", "Por favor, revise el email que ha ingresado.");      
    })
    ;
  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showMessageAndDismiss(header, message){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.modalController.dismiss();         
          }
        }
      ]
    });
    await alert.present();
  }
 
}
