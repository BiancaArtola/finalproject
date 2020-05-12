import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class CanchasService extends RootService {

  conexion: boolean = true;


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
        resolve(canchas)
    
      });

    });
  }

  getDocumentsWithSport(sport: String) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("deporte", "==", sport)
        .get().then(function (querySnapshot) {
          if (!querySnapshot.metadata.fromCache == false)
            reject();
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
          reject();
        });
    })
  }

  getComments(id: number) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("id", "==", id)
        .get().then(function (querySnapshot) {          
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots            
            resolve(doc.data().comentarios);
          });
          reject();
        });
    })
  }


  searchByName(name) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("nombre", "==", name)
        .get().then(function (querySnapshot) {
          let hayResultado = false;

          querySnapshot.forEach(function (doc) {
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
