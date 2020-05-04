import { Component } from '@angular/core';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { MensajesService } from 'src/services/mensajes.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {

  public contenido: string;


  constructor(public toastController: ToastController, public loadingController: LoadingController,
    public modalController: ModalController, public mensajesService: MensajesService
   ) {

  }


  /* Envia un mail al correo seleccionado con la sugerencia del usuario*/
  sendMessage() {
    if (this.contenido == null || !this.contenido)
      this.showToast("No has escrito ningun mensaje.")
    else {
      this.presentLoading();
      this.mensajesService.sendMessage(this.contenido).then(() => {
        this.loadingController.dismiss();
        this.showToast("Su mensaje ha sido enviado correctamente.");
        this.goBack();
      })

    }

  }

  async showToast(message) {
    let toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  goBack() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create();
    await loading.present();
  }

  

}
