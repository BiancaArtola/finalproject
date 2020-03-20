import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  @Input() sport: string;

  private horaActual:number = new Date().getTime();

  private actualDate: String = new Date().toISOString();
  private monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  private hours = [];
  private cantidadJugadores = [5, 7, 9, 11];

  public parts = [
    { val: 'Mañana', isChecked: false },
    { val: 'Tarde', isChecked: false },
    { val: 'Noche', isChecked: false }
  ];

  private tipoCancha;
  private cantJugadores;
  private horarios;

  constructor(private modalController: ModalController, private navParams: NavParams) {
      this.setHours();
      this.sport = navParams.get('sport');      
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  setHours(){
    let i;
    for(i=8; i<24; i++) 
      this.hours.push(i);
  }

  deleteFilters(){
    this.cantJugadores = null;
    this.tipoCancha = null;
    this.horarios = null;
    this.parts.forEach(element => {
      element.isChecked = false;
    });
  }
}
