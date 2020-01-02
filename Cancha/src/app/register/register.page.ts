import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: string;

  constructor(private storage: Storage, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  goHome(){
    console.log(this.usuario);    
    this.storage.set('user', this.usuario);  
    this.router.navigate(['/home']);
    this.modalController.dismiss();
  }

  goBack(){
    this.modalController.dismiss();
  }
}
