import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  usuario: string;

  constructor(private router: Router, private modalController: ModalController, private storage: Storage) {
  }

  goHome(){
    console.log(this.usuario);    
    this.storage.set('user', this.usuario);  
    this.router.navigate(['/home']);
  }

  async openRegister(){
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    return await modal.present();
  }

}
