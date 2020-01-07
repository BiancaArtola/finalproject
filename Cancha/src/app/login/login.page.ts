import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
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

  constructor(private router: Router, private modalController: ModalController, 
    public loadingController: LoadingController, private storage: Storage) {
  }

  async goHome(){
    const loading = await this.loadingController.create({
      translucent: true
    });
    await loading.present();
    this.storage.set('user', this.usuario);  
    this.router.navigate(['/home']).then(()=>{
      loading.dismiss();
    });
  }

  async openRegister(){
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    return await modal.present();
  }

}
