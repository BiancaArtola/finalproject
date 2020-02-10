import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage {

  @Input() sport: string;

  constructor(navParams: NavParams, private modalController: ModalController) {
    console.log(navParams.get('sport'));
  }

  goBack() {
    this.modalController.dismiss();
  }
}
