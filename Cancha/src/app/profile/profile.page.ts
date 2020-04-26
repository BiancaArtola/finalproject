import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  private nombre;
  private email;
  private showButton = false;

  constructor(private modalController: ModalController, private authenticationService: AuthenticationService) {
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
    this.authenticationService.updateUser(this.nombre);
  }
}
