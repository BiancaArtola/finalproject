import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  slideOpts = {
    initialSlide: 0
  };

  constructor(private storage: Storage, private modalController: ModalController) {
    storage.set('tutorial', true);
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
