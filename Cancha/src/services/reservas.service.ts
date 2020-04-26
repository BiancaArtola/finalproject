import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasService extends RootService{

  constructor() { 
    super();
    this.db = firebase.firestore(this.app);
  }

  setReserva(uid, nombre, icono, date) {

    this.db.collection("reservas").doc(uid).update(
      {
        canchas: firebase.firestore.FieldValue.arrayUnion({
          fecha: firebase.firestore.Timestamp.fromDate(new Date(date)),
          nombre: nombre,
          icono: icono,
          id: Date.now()
        })
      }).catch(() => {
        this.db.collection("reservas").doc(uid).set(
          {
            canchas: firebase.firestore.FieldValue.arrayUnion({
              fecha: firebase.firestore.Timestamp.fromDate(new Date(date)),
              nombre: nombre,
              icono: icono,
              id: Date.now()
            })
          })
      }
      )

  }

  getReservas(uid) {
    return new Promise((resolve, reject) => {
      this.db.collection("reservas").doc(uid)
        .get().then(function (querySnapshot) {
          if (querySnapshot.data())
            resolve(querySnapshot.data().canchas);
        });
    })
  }

  cancelarReserva(uid, id) {
    return new Promise((resolve, reject) => {
      let docRef = this.db.collection("reservas").doc(uid);
      docRef.get().then(function (querySnapshot) {
        let index = 0;
        querySnapshot.data().canchas.forEach(element => {
          if (element.id == id) {
            docRef.update({
              canchas: firebase.firestore.FieldValue.arrayRemove({
                fecha: querySnapshot.data().canchas[index].fecha,
                nombre: querySnapshot.data().canchas[index].nombre,
                icono: querySnapshot.data().canchas[index].icono,
                id: querySnapshot.data().canchas[index].id
              })
            });
            resolve(true);
          }
          else index++;
        });
      });
    });
  }
}
