import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {

  private reservas;
  private reservasActivas=[];
  private reservasConcretadas = [];
  private hayReservasActivas: boolean = false;
  private hayReservasConcretadas: boolean = false;

  constructor(private modalController: ModalController, private firebaseAuth: FirebaseAuth) {
  }

  ngOnInit() {
    this.getReservas();

  }


  getReservas() {
    this.firebaseAuth.getUid().then((uid) => {
      this.firebaseAuth.getReservas(uid).then((reservas) => {
        this.reservas = reservas;
        this.setReservas()
      })
    })

  }

  setReservas() {
    // console.log(this.reservas[0].fecha);
    // console.log(this.reservas[1].fecha);
    // var hoy = Date.now();
    // console.log(hoy);


    var date: Date= this.reservas[0].fecha.toDate();
    var formatDate = date.getDate() + "/" + date.getMonth() +"/" + date.getFullYear();
    console.log(formatDate);
    

    // var prueba = this.reservas[0].fecha.seconds;
    // console.log(new Date(prueba*1000));

    // console.log(date.getDate());

    this.separeReservas();
    console.log(this.reservasConcretadas);
    


  }

  separeReservas() {
    this.reservas.forEach(element => {
      var date: Date= element.fecha.toDate();
      var formatDate = date.getDate() + "/" + date.getMonth() +"/" + date.getFullYear();
      if (element.fecha.seconds * 1000 < Date.now()){
        element.fecha = formatDate;
        this.reservasConcretadas.push(element);
      }else{
        element.fecha = formatDate;
        this.reservasActivas.push(element);}
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
