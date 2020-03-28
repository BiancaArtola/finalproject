import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private nombre;


  constructor(private modalController: ModalController, private firebaseAuth: FirebaseAuth) {
    this.firebaseAuth.getUserName().then((nombre) =>{
      this.nombre = nombre;      
    })

   }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
