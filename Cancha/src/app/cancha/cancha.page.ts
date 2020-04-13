import { Component, Input } from '@angular/core';
import { NavParams, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { CommentsPage } from '../comments/comments.page';
import { PayPage } from '../pay/pay.page';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage {

  @Input() id: number;
  @Input() date;
  private cancha;
  private horas = [19, 20, 21, 22];
  private active;


  constructor(navParams: NavParams, private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController, private firebaseAuth: FirebaseAuth) {
    this.id = navParams.get('id');
    this.date = navParams.get('date');

    this.presentLoading().then(() => {
      this.firebaseAuth.getDocument(this.id).then((cancha) => {
        this.cancha = cancha;
        this.loadingController.dismiss();
      })
    })
  }

  updateActive(hora) {
    this.active = hora;
  }

  async openPagos() {
    if (this.active) {
      const modal = await this.modalController.create({
        component: PayPage,
        componentProps:
        {
          cancha: this.cancha,
          date: this.date,
          hora: this.active
        }
      });
      return await modal.present();
    }
    else 
    this.showMessage("Debe seleccionar un horario para comenzar con la reserva")
  }

  async showMessage(header) {
    const alert = await this.alertController.create({
      header: header,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
  }

  goBack() {
    this.modalController.dismiss();
  }

  async openComments() {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: {
        id: this.cancha.id
      },
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}
