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
  //  this.conection();
   // console.log("cons "+this.conected);
    
  }

  conection() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
      if (snap.val() === true) { //hay internet
        //this.conexion = true;
        console.log("hay");

      } else { //no hay conexion
        console.log("no hay");
       // this.conexion = false;
      }
    });

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
        // var connectedRef = firebase.database().ref(".info/connected");
        // connectedRef.on("value", function (snap) {
        //   if (snap.val() === true) { //hay internet
        //     //this.conexion = true;
        //     console.log("hay");
        //     resolve(canchas);

        //   } else { //no hay conexion
        //     console.log("no hay");
        //     reject();
        //    // this.conexion = false;
        //   }
        // });
    
      });

    });
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
