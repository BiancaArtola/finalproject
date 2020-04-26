import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class CanchasService extends RootService{

  constructor() {
    super();
    this.db = firebase.firestore(this.app);

  }


  getAllDocumentsInCollection() {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").get().then(function (querySnapshot) {
        let canchas = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          canchas.push(doc.data())
        });
        resolve(canchas);
      });
    })

  }

  getDocumentsWithSport(sport: String) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("deporte", "==", sport)
        .get().then(function (querySnapshot) {
          let canchas = [];
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            canchas.push(doc.data())
          });
          resolve(canchas);
        });
    })

  }

  getDocument(id: number) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("id", "==", id)
        .get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            resolve(doc.data());
          });

        });
    })
  }

  searchByName(name) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("nombre", "==", name)
        .get().then(function (querySnapshot) {
          let hayResultado = false;

          querySnapshot.forEach(function (doc) {
            console.log(doc.data().id);

            resolve(doc.data().id);
            hayResultado = true;
          });

          if (!hayResultado) {

            reject();

          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

    })
  }

  
}
