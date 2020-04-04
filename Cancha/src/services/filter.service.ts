import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private app;
  private db;

  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(environment.firebase);
      this.db = firebase.firestore(this.app);
    }
  }

  filterTechada(){
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("techada", "==", true)
        .get().then(function (querySnapshot) {
          let canchas = [];
          querySnapshot.forEach(function (doc) {
            canchas.push(doc.data())
          });
          resolve(canchas);
        });
    })
  }
}
