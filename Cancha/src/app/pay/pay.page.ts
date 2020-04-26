import { Component, Input } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReservasService } from 'src/services/reservas.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage {

  private cancha;
  @Input() date;
  @Input() hora;

  private fecha: string;
  private meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  constructor(private modalController: ModalController, private navParams: NavParams,
    private loadingController: LoadingController,private router: Router, private reservasService: ReservasService,
    private alertController: AlertController, private authenticationService: AuthenticationService) {
    this.cancha = navParams.get('cancha');
    this.date = navParams.get('date');
    this.hora = navParams.get('hora');

    this.createFecha();
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
    this.authenticationService.getUid().then((uid) => {
      
      this.reservasService.setReserva(uid, this.cancha.nombre, this.cancha.icono, this.date);
      this.loadingController.dismiss();
      this.showMessage("¡El pago ha sido realizado con exito!", "Podes ver la reserva en la sección 'Mis reservas'");
    });

  }

  async showMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/home']);
            this.goBack();
            this.modalController.dismiss(null, null, "dateAndHourModal");
            this.modalController.dismiss(null, null, "canchaModal");            
          }
        }
      ]
    });
    await alert.present();
  }

}
