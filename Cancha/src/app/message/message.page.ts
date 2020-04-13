import { Component } from '@angular/core';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {

  private contenido: string;


  constructor(public toastController: ToastController, private loadingController: LoadingController,
    private modalController: ModalController, private firebaseAuth: FirebaseAuth,
   ) {

  }


  /* Envia un mail al correo seleccionado con la sugerencia del usuario*/
  sendMessage() {
    if (this.contenido == null || !this.contenido)
      this.showToast("No has escrito ningun mensaje.")
    else {
      this.presentLoading();
      this.firebaseAuth.sendMessage(this.contenido).then(() => {
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
