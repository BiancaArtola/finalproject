import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuth extends RootService {

  constructor() {
    super();
  }

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
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.updateProfile({
          displayName: nombre
        })
      }
    })
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
