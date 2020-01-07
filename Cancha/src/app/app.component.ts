import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router, 
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
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
      this.splashScreen.hide();
    });
  }

  goToLogin(){
    this.router.navigate(['/login']);
    this.menu.close();
  }
}
