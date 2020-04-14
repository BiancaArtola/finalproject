import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { PayPage } from '../pay/pay.page';

@Component({
  selector: 'app-date-and-hour',
  templateUrl: './date-and-hour.page.html',
  styleUrls: ['./date-and-hour.page.scss'],
})
export class DateAndHourPage implements OnInit {
  @Input() date;
  private actualDate: String = new Date().toISOString();
  private maxDay;

  private dateModel;
  private monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  private horas = [12, 15, 19, 20, 21, 22];
  private active;

  private cancha;

  constructor(private modalController: ModalController, private alertController: AlertController,
    private navParams: NavParams) { 
    this.cancha = navParams.get('cancha');
    this.dateModel = navParams.get('date');
    if (!this.dateModel)
      this.dateModel = new Date().toISOString();

    this.maxDay = new Date();
    this.maxDay.setDate(this.maxDay.getDate() + 10);
    this.maxDay = this.maxDay.toISOString();
  }

  ngOnInit() {
    console.log("aca");
    
  }

  ionViewDidLeave(){
    console.log("me fui de date and hour");
    
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
        

        const { data } = await modal.onDidDismiss();
        console.log(data);
        
        if (data){
          console.log("entre aca brodiiii");
          this.dismiss();
        }
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
