import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, ModalController, LoadingController, AlertController, PopoverController, Platform, MenuController } from '@ionic/angular';
import { TutorialPage } from '../tutorial/tutorial.page';
import { MessagePage } from '../message/message.page';
import { CanchaPage } from '../cancha/cancha.page';
import { HomePopoverPage } from '../home-popover/home-popover.page';
import { CanchasService } from 'src/services/canchas.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public canchas;
  icons1 = ['futbol', 'basket', 'voley', 'hockey'];
  icons2 = ['tennis', 'padel', 'pinpon', 'otros'];
  public usuario: string;
  public name: string
  public modeloCancha;
  public message: string;
  public loading = true;
  public subscription;


  constructor(public router: Router, public storage: Storage, public navController: NavController,
    public modalController: ModalController, public authenticationService: AuthenticationService,
    public loadingController: LoadingController, public alertController: AlertController,
    public popoverController: PopoverController, public canchasService: CanchasService,
    public platform: Platform, public menuCtrl: MenuController, public splashScreen: SplashScreen) {

    storage.get('user').then((val) => {
      if (!val) {
        storage.get('tutorial').then((tutorial) => {
          if (!tutorial) { //Si el usuario aun no se registro ni vio el tutorial
            this.goToTutorial().then(() => this.splashScreen.hide());
            this.navController.navigateRoot(['login']);
            console.log("No hay tutorial ni usuario ", tutorial, "+", val);
          } else {
            //Si el usuario ya vio el tutorial pero aun no se registro
            console.log("No hay usuario si tutorial", tutorial, "+", val);
            this.navController.navigateRoot(['login']).then(() => this.splashScreen.hide());
          }



        });
      }
      else { //El usuario ya esta registrado entonces se dirige hacia la pagina de inicio
        console.log("Si hay usuario ", val);
        this.getAllDocumentsInCollection();
        this.usuario = val;
        this.splashScreen.hide();

      }
    });
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }


  getAllDocumentsInCollection() {
    this.loading = true;
    this.canchasService.getAllDocumentsInCollection()
      .then(information => {
        this.loading = false;
        this.canchas = information;
        this.message = "No hay canchas disponibles por el momento."
      });
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create();
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
      },
      id: "canchaModal"
    });
    await modal.present();
    await modal.onWillDismiss().then(() => this.menuCtrl.enable(true));
  }


  async openRecomendations() {
    const modal = await this.modalController.create({
      component: MessagePage,
    });
    return await modal.present();
  }

  goToLogin() {
    this.authenticationService.logoutUser().then(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Ocurrio un error.");

    })
  }

  async searchSport() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.canchasService.searchByName(this.modeloCancha.toLowerCase())
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: HomePopoverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
