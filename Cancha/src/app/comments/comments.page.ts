import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() id: number;
  public contenido: string;
  public usuario: string;

  constructor(public navParams: NavParams, public storage: Storage, public toastController: ToastController,
     public authenticationService: AuthenticationService, public modalController: ModalController) {
    this.id = navParams.get('id');

  }

  ngOnInit() {
  }

  sendMessage() {
    this.storage.get('user').then((usuario) => {
      this.authenticationService.setComment(this.id, this.contenido)
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
