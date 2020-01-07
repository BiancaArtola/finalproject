import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {

  @Input() sport: string;

  constructor(navParams: NavParams, private modalController: ModalController) { 
    console.log(navParams.get('sport'));
    
  }

  ngOnInit() {

  }

  goBack(){
    this.modalController.dismiss();
  }
}
