import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  goBack() {
    this.modalController.dismiss();
  }
}
