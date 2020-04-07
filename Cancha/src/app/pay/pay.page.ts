import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  private cancha;


  constructor(private modalController: ModalController, private navParams: NavParams, 
    private alertController: AlertController) { 
    this.cancha = navParams.get('cancha');      
  }

  ngOnInit() {
  }


  goBack() {
    this.modalController.dismiss();
  }

  pay() {
    this.showMessage("¡El pago ha sido realizado con exito!", "Podes ver la reserva en tu perfil.");
    this.goBack();
  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
