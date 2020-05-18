import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { PayPage } from '../pay/pay.page';

@Component({
  selector: 'app-date-and-hour',
  templateUrl: './date-and-hour.page.html',
  styleUrls: ['./date-and-hour.page.scss'],
})
export class DateAndHourPage  {
  @Input() date;
  public actualDate: String = new Date().toISOString();
  public maxDay;

  public dateModel;
  public monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  public horas = [12, 15, 18, 20, 21, 22];
  public active;

  public cancha;

  constructor(public modalController: ModalController, public alertController: AlertController,
    public navParams: NavParams) { 
    this.cancha = navParams.get('cancha');
    this.dateModel = navParams.get('date');
    if (!this.dateModel)
      this.dateModel = new Date().toISOString();

    this.maxDay = new Date();
    this.maxDay.setDate(this.maxDay.getDate() + 10);
    this.maxDay = this.maxDay.toISOString();

    this.parche();
  }

  parche(){
    let numero = Math.floor(Math.random() * 6)
    
    let horasPrueba = this.horas.slice(0, numero+1);
    
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
            date: this.dateModel,
            hora: this.active
          }
        });
        await modal.present();
      }
      else 
        this.showMessage("Debe seleccionar un horario para comenzar con la reserva")
    }

    async dismiss(){
     await this.modalController.dismiss();
    }

    async showMessage(header) {
      const alert = await this.alertController.create({
        header: header,
        buttons: ['OK']
      });
      await alert.present();
    }
}
