import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { ReservasPage } from 'src/app/reservas/reservas.page';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuth {
  app;
  db;

  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(environment.firebase);
      this.db = firebase.firestore(this.app);
    }
  }

  getInformation(): Promise<void> {
    return new Promise((resolve, reject) => {
      var auxiliar = this.db.collection("canchas").doc("informacion");
      auxiliar.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          resolve(doc.data());
        } else {
          console.log("No such document!");
          reject(doc.data());
        }
      });
    })

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

  setCancha() {
    this.db.collection("canchas").doc("3") //CAMBIAR DOC TMBBBBBBBBB
      .set({
        id: 3,
        nombre: "El nacional",
        ubicacion: "14 de Julio 3250",
        telefono: 2914860739,
        precio: 700,
        imagen: "https://viapais.com.ar/files/2018/11/20181128175803_35398258_0_body.jpg",
        estrellas: 1,
        descripcion: "El Club El Nacional es un club polideportivo de la ciudad de Bahía Blanca, Argentina fundado en septiembre de 1919.",
        deporte: "tennis",
        cronograma: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
        coordenadas: [38.7066358, 62.2532615],
        comentarios: [],
        techada: false,
        piso: "ladrillo"
      })
      .then(function () {
        console.log("Se agrego correctamente");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
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

  setReserva(uid, nombre, icono, date) {

    console.log(this.db.collection("reservas").doc(uid));

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


  getCancha(id: number) {
    return new Promise((resolve, reject) => {
      this.db.collection("canchas").where("id", "==", id)
        .get().then((cancha) => {
          let canchas = [];
          cancha.forEach(function (doc) {

            canchas.push(doc.data())
          });
          resolve(canchas[0]);
        });
    })
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

  updateUserName(userName: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.updateProfile({
            displayName: "lola garcia"
          })
        }
      })
    });
  }

  sendMessage(mensaje){
    return new Promise((resolve, reject) => {
      this.db.collection("mensajes").add({
        message: mensaje
      }).then(()=> resolve(true))
    });

  }

}
