import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {

  @Input() sport: string;

  constructor(navParams: NavParams) { 
    console.log(navParams.get('sport'));
    
  }

  ngOnInit() {

  }

}
