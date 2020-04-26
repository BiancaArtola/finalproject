import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})

export class FilterService extends RootService {

  constructor() {
    super();
    this.db = firebase.firestore(this.app);

  }

  filterOneCondition(condition, value, sport) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("deporte", "==", sport).where(condition, "==", value)
        .get().then(function (querySnapshot) {
          let canchas = [];
          querySnapshot.forEach(function (doc) {

            console.log(doc.data());
            canchas.push(doc.data())
          });
          resolve(canchas);
        });
    })
  }

  filterTwoConditions(condition, value, condition2, value2, sport) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("deporte", "==", sport).where(condition, "==", value).where(condition2, "==", value2)
        .get().then(function (querySnapshot) {
          let canchas = [];
          querySnapshot.forEach(function (doc) {
            canchas.push(doc.data())
          });
          resolve(canchas);
        });
    })
  }

  filterTreeConditions(condition, value, condition2, value2, condition3, value3, sport) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("deporte", "==", sport).where(condition, "==", value).where(condition2, "==", value2).where(condition3, "==", value3)
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
