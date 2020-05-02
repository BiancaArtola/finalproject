import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends RootService {

  constructor() {
    super();
    this.db = firebase.firestore(this.app);

  }

  // getInformation(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     var auxiliar = this.db.collection("canchas").doc("informacion");
  //     auxiliar.get().then(function (doc) {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         resolve(doc.data());
  //       } else {
  //         console.log("No such document!");
  //         reject(doc.data());
  //       }
  //     });
  //   })

  // }


  // setCancha() {
  //   this.db.collection("canchas").doc("3") //CAMBIAR DOC TMBBBBBBBBB
  //     .set({
  //       id: 3,
  //       nombre: "El nacional",
  //       ubicacion: "14 de Julio 3250",
  //       telefono: 2914860739,
  //       precio: 700,
  //       imagen: "https://viapais.com.ar/files/2018/11/20181128175803_35398258_0_body.jpg",
  //       estrellas: 1,
  //       descripcion: "El Club El Nacional es un club polideportivo de la ciudad de Bahía Blanca, Argentina fundado en septiembre de 1919.",
  //       deporte: "tennis",
  //       cronograma: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
  //       coordenadas: [38.7066358, 62.2532615],
  //       comentarios: [],
  //       techada: false,
  //       piso: "ladrillo"
  //     })
  //     .then(function () {
  //       console.log("Se agrego correctamente");
  //     })
  //     .catch(function (error) {
  //       console.error("Error writing document: ", error);
  //     });
  // }

  setComment(id: number, comentario: string) {
    let idString = id.toString();

    this.getUserName().then((nombre) => {
      this.db.collection("canchas").doc(idString).update(
        {
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            comentario: comentario,
            nombre: nombre
          })
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    })

  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, nombre: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password).then((user) => {
        if (user) {
          user.user.updateProfile({
            displayName: nombre
          })
        }
      })
  }

  updateUser(nombre) {
    return new Promise((resolve, reject) => {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.updateProfile({
            displayName: nombre
          })
          resolve(true);
        }
      });
    });
  }

  getEmail() {
    var user = firebase.auth().currentUser;
    if (user) {
      return user.email;
    }
  }


  getUid() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var uid = user.uid;
          resolve(uid);
        }
      });
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getUserName() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var displayName = user.displayName;
          resolve(displayName);
        }
      });
    });
  }
}
