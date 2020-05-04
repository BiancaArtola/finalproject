import { Component } from '@angular/core';

import { Platform, MenuController, ModalController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Environment } from '@ionic-native/google-maps';
import { MessagePage } from './message/message.page';
import { ProfilePage } from './profile/profile.page';
import { HelpPage } from './help/help.page';
import { ReservasPage } from './reservas/reservas.page';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public userName;

  constructor(private router: Router, private modalController: ModalController,public events: Events,
    private menu: MenuController, private platform: Platform, private authenticationService: AuthenticationService,
    private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
    this.getUserName();

      events.subscribe('user:login', () => {
        this.getUserName();
      });

      events.subscribe('user:created', (user) => {
        this.userName = user;
      });
    
    
  }

  getUserName() {
    this.authenticationService.getUserName().then((nombre) => {
      this.userName = nombre;
      console.log("here", this.userName);
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {

      Environment.setEnv({
        // api key for server
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD_mVCh6mJWkCl-rmCyWITJdMHIIqr-PRE',

        // api key for local development
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD_mVCh6mJWkCl-rmCyWITJdMHIIqr-PRE'
      });

      this.statusBar.styleDefault();
     // this.splashScreen.hide();


    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.menu.close();
  }

  async goToMessage() {
    this.menu.close();

    const modal = await this.modalController.create({
      component: MessagePage,
    });
    return await modal.present();
  }

  async goToProfile() {
    this.menu.close();

    const modal = await this.modalController.create({
      component: ProfilePage,
    });
    return await modal.present();
  }

  goHome() {
    this.menu.close();
  }

  async goToHelp() {
    this.menu.close();

    const modal = await this.modalController.create({
      component: HelpPage,
    });
    return await modal.present();
  }

  async goToReservas() {
    this.menu.close();

    const modal = await this.modalController.create({
      component: ReservasPage,
    });
    return await modal.present();
  }

}
