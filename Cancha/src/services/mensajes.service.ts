import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class MensajesService extends RootService{

  constructor() {
    super();
    this.db = firebase.firestore(this.app);

  }

  sendMessage(mensaje) {
    return new Promise((resolve, reject) => {
      this.db.collection("mensajes").add({
        message: mensaje
      }).then(() => resolve(true))
    });

  }
}
