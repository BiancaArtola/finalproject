import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ReservasService } from 'src/services/reservas.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {

  private reservas;
  private reservasActivas = [];
  private reservasConcretadas = [];
  private uid;

  constructor(private modalController: ModalController, private authenticationService: AuthenticationService,
    private alertController: AlertController, private loadingController: LoadingController,
    private reservasService: ReservasService) {
  }

  ngOnInit() {
    this.getReservas();
  }

  getReservas() {
    this.authenticationService.getUid().then((uid) => {
      this.uid = uid;
      this.reservasService.getReservas(uid).then((reservas) => {
        this.reservas = reservas;
        this.separeReservas()
      })
    })
  }

  separeReservas() {
    if (this.reservas) {
      this.reservas.forEach(element => {

        var date: Date = element.fecha.toDate();
        var formatDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        if ((element.fecha.seconds+86400) * 1000 < Date.now()) {
          //La fecha de reserva + los segundos correspondientes a un dia
          element.fecha = formatDate;
          this.reservasConcretadas.push(element);
        } else {
          element.fecha = formatDate;
          this.reservasActivas.push(element);
        }
      });
    }

  }


  dismiss() {
    this.modalController.dismiss();
  }



  async createAlert(reserva) {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de que deseas cancelar la reserva?',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }, {
          text: 'Si, cancelar',
          handler: () => {
            this.cancelarReserva(reserva);
          }
        }
      ]
    });
    await alert.present();
  }

  cancelarReserva(reserva) {
    this.presentLoading();

    this.reservasService.cancelarReserva(this.uid, reserva.id).then((cancelado) => {
      if (cancelado){
        this.reservas = null;
        this.reservasActivas = [];
        this.reservasConcretadas = [];
        this.getReservas();
      }
      this.loadingController.dismiss()
    })

  }

  async presentLoading() {
    const loading = await this.loadingController.create();
    await loading.present();
  }


}
