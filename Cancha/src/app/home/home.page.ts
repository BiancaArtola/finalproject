import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private usuario: string;
  constructor(private router: Router, private storage: Storage, private navController: NavController) {
    storage.get('user').then((val) => {
      console.log('usuario', val);
      if (!val)
       this.navController.navigateRoot(['login']);
      else      
       this.usuario = val;

    });
  }


  goToDeporte(){
    this.router.navigate(['/deporte']);
    
  }


  goToLogin(){
    this.router.navigate(['/login']);

  }
}
