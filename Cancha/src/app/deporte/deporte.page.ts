import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchaPage } from '../cancha/cancha.page';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage implements OnInit {
  icons = ['futbol', 'basket', 'voleibol', 'tennis'];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async openCourts(sport){
    const modal = await this.modalController.create({
      component: CanchaPage,
      componentProps: {
        'sport': sport
      }
    });
    return await modal.present();
  }

}
