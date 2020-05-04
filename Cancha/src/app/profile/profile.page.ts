import { Component } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  public nombre;
  public email;
  public showButton = false;

  constructor(public modalController: ModalController, public authenticationService: AuthenticationService,
    public events: Events) {
    this.authenticationService.getUserName().then((nombre) =>{
      this.nombre = nombre;      
      this.email = this.authenticationService.getEmail();
      this.showButton=false;      
    })
   }


  dismiss() {
    this.modalController.dismiss();
  }

  appearButton(){
   this.showButton = true;
  }

  changeName(){
    this.showButton = false;    
    this.authenticationService.updateUser(this.nombre).then(()=>{
      this.events.publish('user:created', this.nombre);

    })
  }
}
