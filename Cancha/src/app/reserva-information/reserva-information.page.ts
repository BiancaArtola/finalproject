import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CanchasService } from 'src/services/canchas.service';

@Component({
  selector: 'app-reserva-information',
  templateUrl: './reserva-information.page.html',
  styleUrls: ['./reserva-information.page.scss'],
})
export class ReservaInformationPage {

  @Input() reserva;

  public cancha;
  public loading = true;

  constructor(public modalController: ModalController, public canchasService: CanchasService,
    public navParams: NavParams) {
    this.reserva = navParams.get('reserva');
    this.getDocument();
   }


  getDocumentById(){
    this.canchasService.getDocument(this.reserva.idCancha).then((cancha) => {      
      this.cancha = cancha;
      this.loading = false;
    });
  }

  getDocument(){
    this.loading = true;
    this.canchasService.getDocument(this.reserva.idCancha).then((cancha) => { 
      this.cancha = cancha;
      this.loading = false;
    }).catch(()=>{
      this.loading = false;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
