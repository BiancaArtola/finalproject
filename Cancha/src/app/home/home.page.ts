import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ModalController } from '@ionic/angular';
import { TutorialPage } from '../tutorial/tutorial.page';
import { ConexionBDD } from '../../services/ConexionBDD';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private buttonColor: string = "new";

  icons = ['futbol', 'basket', 'voley', 'hockey', 'tennis', 'pinpon'];
  private usuario: string;

  constructor(private router: Router, private storage: Storage, private navController: NavController,
    private modalController: ModalController, private conexion: ConexionBDD, private firebaseAuth: FirebaseAuth) {
    storage.get('user').then((val) => {
      if (!val) {
        storage.get('tutorial').then((tutorial) => {
          if (!tutorial) { //Si el usuario aun no se registro ni vio el tutorial
            this.goToTutorial();
            console.log("No hay tutorial ni usuario ", tutorial, "+", val);
          }
          //Si el usuario ya vio el tutorial pero aun no se registro
          console.log("No hay usuario si tutorial", tutorial, "+", val);
          this.navController.navigateRoot(['login']);
        });
      }
      else { //El usuario ya esta registrado entonces se dirige hacia la pagina de inicio
        console.log("Si hay usuario ", val);
        this.usuario = val;
        this.conexion.get().subscribe((data) => console.log(data));
      }
    });
  }


  async goToTutorial() {
    const modal = await this.modalController.create({
      component: TutorialPage,
    });
    return await modal.present();
  }

  goToSport() {
    this.buttonColor = "red";

    this.router.navigate(['/deporte']);
  }

  goToLogin() {
    this.firebaseAuth.logoutUser().then(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Ocurrio un error.");

    })
  }


}
