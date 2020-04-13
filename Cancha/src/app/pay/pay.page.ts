import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  private cancha;
  @Input() date;
  @Input() hora;

  private fecha: string;
  private meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private modalController: ModalController, private navParams: NavParams,
    private loadingController: LoadingController,
    private alertController: AlertController, private firebaseAuth: FirebaseAuth) {
    this.cancha = navParams.get('cancha');
    this.date = navParams.get('date');
    this.hora = navParams.get('hora');

    this.createFecha();
  }

  ngOnInit() {
  }

  createFecha() {
    var auxiliar = new Date(this.date);
    this.fecha = auxiliar.getDate() + " " + this.meses[auxiliar.getMonth()] + ", " + auxiliar.getFullYear();
  }

  goBack() {
    this.modalController.dismiss();
  }

  pay() {
    this.loadingController.create();
    this.firebaseAuth.getUid().then((uid) => {
      console.log(this.date);
      
      this.firebaseAuth.setReserva(uid, this.cancha.nombre, this.cancha.icono, this.date);
      this.showMessage("¡El pago ha sido realizado con exito!", "Podes ver la reserva en la sección 'Mis reservas'");
      this.goBack();
      this.loadingController.dismiss();
    });

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
