import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() id: number;
  private contenido: string;
  private usuario: string;

  constructor(private navParams: NavParams, private storage: Storage, private toastController: ToastController,
     private firebaseAuth: FirebaseAuth, private modalController: ModalController) {
    this.id = navParams.get('id');

  }

  ngOnInit() {
  }

  sendMessage() {
    this.storage.get('user').then((usuario) => {
      this.firebaseAuth.setComment(this.id, this.contenido)
      this.modalController.dismiss();
      this.presentToast();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu comentario ha sido enviado con éxito.',
      duration: 2000
    });
    toast.present();
  }

}
