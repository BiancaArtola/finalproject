import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFirestore, AngularFirestoreModule  } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
// import { HTTP } from '@ionic-native/http/ngx';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MessagePageModule } from './message/message.module';
import { TutorialPageModule } from './tutorial/tutorial.module';
import { ProfilePageModule } from './profile/profile.module';

import { FirebaseAuth } from './../services/FirebaseAuth';

import { HttpClientModule } from '@angular/common/http';
import { RegisterPageModule } from './register/register.module';
import { ReservasPageModule } from './reservas/reservas.module';
import { CommentsPageModule } from './comments/comments.module';
import { HelpPageModule } from './help/help.module';
import { CanchaPageModule } from './cancha/cancha.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,  
    IonicStorageModule.forRoot(), 
    AngularFirestoreModule,
    MessagePageModule,
    ProfilePageModule,
    TutorialPageModule,
    HttpClientModule,
    RegisterPageModule,
    ReservasPageModule,
    CommentsPageModule,
    HelpPageModule,
    CanchaPageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,    
    FirebaseAuth,
    AngularFirestore,
    FirebaseAuthentication,
    // HTTP,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

