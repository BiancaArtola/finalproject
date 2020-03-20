import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';

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


  getInformation(): Promise<void>{
    return new Promise((resolve, reject) => {
      var auxiliar = this.db.collection("canchas").doc("informacion");
      auxiliar.get().then(function(doc) {
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

  getAllDocumentsInCollection(){
    return new Promise((resolve, reject) =>{
      this.db.collection("canchas").get().then(function(querySnapshot) {
        let canchas = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            canchas.push(doc.data())
        });
        resolve(canchas);
    });
    })
   
  }

  getDocumentsWithSport(sport:String){   
    return new Promise((resolve, reject) =>{
      this.db.collection("canchas").where("deporte", "==", sport)
      .get().then(function(querySnapshot) {
        let canchas = [];
        querySnapshot.forEach(function(doc) {          
            // doc.data() is never undefined for query doc snapshots
            canchas.push(doc.data())
        });
        resolve(canchas);
    });
    })

  }

  getDocument(id: number){
    return new Promise((resolve, reject) =>{
      this.db.collection("canchas").where("id", "==", id)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {          
            // doc.data() is never undefined for query doc snapshots
            resolve(doc.data());
        });
       
    });
    })
  }

  setCancha(){
    this.db.collection("canchas").doc("1")
    .set({
      id: 1,
      nombre: "Shopping Futbol Club",
      ubicacion: "Raúl Scalabrini Ortiz 199",
      telefono: 2914353288,
      precio: 1500,
      imagen: "https://scontent.faep9-2.fna.fbcdn.net/v/t1.0-9/14088514_298801890478875_1388104237771315384_n.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=oZlbulnvw8MAX8KpX2j&_nc_ht=scontent.faep9-2.fna&oh=79a53ebfc13ca1e8aaae21f76af01404&oe=5E9553D5",
      estrellas: 1,
      descripcion: "Canchas de Fútbol 5 y 7 sobre césped sintético.",
      deporte: "futbol",
      cronograma: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
      coordenadas: [38.7066358, 62.2532615],
      comentarios: ["Excelente lugar para jugar un partido y compartir un asado"]
    }) 
    .then(function() {
      console.log("Se agrego correctamente");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  setComment(id: number, comentario: string, usuario: string){
    console.log("id: ", id, "comentario: ", comentario, "usuario: ", usuario);
    
    this.db.collection("canchas").doc("0").update({
      comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
    })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }

}
