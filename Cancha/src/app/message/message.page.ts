import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {

  private contenido: string;

  constructor(public toastController: ToastController, private emailComposer: EmailComposer,
    private modalController: ModalController) { }


  /* Envia un mail al correo seleccionado con la sugerencia del usuario*/
  sendMessage() {
    if (this.contenido == null || !this.contenido)
      this.showToast("No has escrito ningun mensaje.")
    else {
      let email = {
        to: 'bian.artola@hotmail.com',
        subject: 'Mensaje de sugerencia',
        body: this.contenido,
      }

      // Send a text message using default options
      this.emailComposer.open(email);
      this.showToast("Su mensaje ha sido enviado correctamente.");
      this.goBack();
    }

  }

  async showToast(message) {
    let toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


  goBack() {
    this.modalController.dismiss();
  }
}
