import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  order(condition: string) {
    this.modalController.dismiss({
      condition: condition
    });
  }
}
