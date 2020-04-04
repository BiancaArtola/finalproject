import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TutorialPage } from '../tutorial/tutorial.page';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { MessagePage } from '../message/message.page';
import { CanchaPage } from '../cancha/cancha.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private canchas;
  icons1 = ['futbol', 'basket', 'voley', 'hockey'];
  icons2 = ['tennis', 'padel', 'pinpon', 'otros'];
  private usuario: string;
  private name: string
  private modeloCancha;


  constructor(private router: Router, private storage: Storage, private navController: NavController,
    private modalController: ModalController, private firebaseAuth: FirebaseAuth,
    private loadingController: LoadingController, private alertController: AlertController) {

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
        this.presentLoading().then(() => {
          //this.firebaseAuth.setCancha();
          this.firebaseAuth.getAllDocumentsInCollection().then(information => {
            this.canchas = information;
            this.loadingController.dismiss();
          });
          this.usuario = val;
        })

      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
  }

  async goToTutorial() {
    const modal = await this.modalController.create({
      component: TutorialPage,
    });
    return await modal.present();
  }

  goToSport(sport: String) {
    if (sport === 'otros')
      this.createAlert();
    else
      this.router.navigate(['/deporte', sport]);
  }


  async createAlert() {
    const alert = await this.alertController.create({
      header: '¿Buscas practicar otro deporte?',
      message: 'Por el momento no contamos con alquileres disponibles para otros deportes. Recomendanos alguna cancha para otro deporte!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Recomendar ',
          handler: () => {
            this.openRecomendations();
          }
        }
      ]
    });
    await alert.present();
  }

  async openCourt(id: number) {
    const modal = await this.modalController.create({
      component: CanchaPage,
      componentProps:
      {
        id: id
      }
    });
    return await modal.present();
  }


  async openRecomendations() {
    const modal = await this.modalController.create({
      component: MessagePage,
    });
    return await modal.present();
  }

  goToLogin() {
    this.firebaseAuth.logoutUser().then(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Ocurrio un error.");

    })
  }

  async searchSport() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.firebaseAuth.searchByName(this.modeloCancha.toLowerCase())
      .then((cancha: number) => {
        this.openCourt(cancha);
        this.modeloCancha = "";
        this.loadingController.dismiss();
      })
      .catch(() => {
        let header = "No se ha encontrado ninguna cancha con el nombre '" + this.modeloCancha + "'";
        let message = "Realice la búsqueda nuevamente. ¡También puede conocer nuevas canchas recorriendo nuestras opciones!"
        this.showAlertSport(header, message);
      })
  }

  async showAlertSport(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    this.loadingController.dismiss();
    await alert.present();
  }


}
