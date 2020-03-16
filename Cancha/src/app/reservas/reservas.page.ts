import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  private cancha;


  constructor(private modalController: ModalController, private navParams: NavParams) { 

    this.cancha = navParams.get('cancha');
    console.log(this.cancha);
    
  
  }

  ngOnInit() {
  }


  goBack() {
    this.modalController.dismiss();
  }
}
