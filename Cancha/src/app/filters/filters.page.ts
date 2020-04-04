import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular';
import { FilterService } from 'src/services/filter.service';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  @Input() sport: string;

  private horaActual: number = new Date().getTime();
  private actualDate: String = new Date().toISOString();

  private monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  private hours = [];
  private cantidadJugadores = [5, 7, 9, 11];
  private materialPiso = ['Sintetico', 'Pasto', 'Ladrillo']
  private parts = [
    { val: 'Mañana (10-13 hs)', isChecked: false },
    { val: 'Tarde (16-18 hs)', isChecked: false },
    { val: 'Noche (19-23 hs)', isChecked: false }
  ];
  private tipoCancha = ['Futbol 5', 'Futbol 7', 'Futbol 9', 'Futbol 11'];

  private tipoCanchaModelo;
  private cantJugadoresModelo;
  private horariosModelo;
  private materialModelo;

  private horariosDisabled = false;
  private daysDisabled = false;
  private cantJugadoresDisabled = false;
  private tipoCanchaDisabled = false;
  private toggleChecked = false;

  constructor(private modalController: ModalController, private navParams: NavParams,
    private firebaseAuth: FirebaseAuth, private loadingController: LoadingController,
    private toastController: ToastController, private filterService: FilterService) {
    this.setHours();
    this.sport = navParams.get('sport');
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  setHours() {
    let i;
    for (i = 8; i < 24; i++)
      this.hours.push(i);
  }

  deleteFilters() {
    this.cantJugadoresModelo = null;
    this.tipoCanchaModelo = null;
    this.horariosModelo = null;
    this.materialModelo = null;
    //this.toggleChecked=false;
    this.horariosDisabled = false;
    this.parts.forEach(element => {
      element.isChecked = false;
    });
    this.daysDisabled = false;
    this.cantJugadoresDisabled = false;
    this.tipoCanchaDisabled = false;

    this.presentToast("Se han eliminados todos los filtros.");
  }

  toggle() {
    this.toggleChecked = !this.toggleChecked;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  changeSelect() {
    this.daysDisabled = true;
  }

  daysSelect() {
    this.horariosDisabled = false;
    this.parts.forEach(element => {
      if (element.isChecked)
        this.horariosDisabled = true;

    });
  }

  tipoCanchaSelect() {
    this.cantJugadoresDisabled = true;
  }

  cantJugadoresSelect() {
    this.tipoCanchaDisabled = true;
  }

  filtrar() {
    if (this.sport == "futbol")
      this.filterFutbol();
    else
      this.filterOtherSports();

  }

  filterFutbol() {
    if (!this.cantJugadoresModelo && !this.tipoCanchaModelo)
      this.filterOtherSports();
    else if (this.cantJugadoresModelo)
      this.filterExtraConditions("cantJugadores", this.cantJugadoresModelo);
    else if (this.tipoCanchaModelo)
      this.filterExtraConditions("tipoCancha", this.tipoCanchaModelo.toLowerCase());
  }

  filterExtraConditions(condition, value) {
    if (this.toggleChecked && !this.materialModelo)
      this.filterTwoConditions(condition, value, "techada", true);
    else if (this.toggleChecked && this.materialModelo)
      this.filterTreeConditions(condition, value, "techada", true, "piso", this.materialModelo.toLowerCase());
    else if (!this.toggleChecked && !this.materialModelo)
      this.filterOneCondition(condition, value);
    else if (!this.toggleChecked && this.materialModelo)
      this.filterTwoConditions(condition, value, "piso", this.materialModelo.toLowerCase());

  }

  filterOtherSports() {
    if (this.toggleChecked) {
      if (this.materialModelo != null)
        this.filterTwoConditions("techada", true, "piso", this.materialModelo.toLowerCase());
      else
        this.filterOneCondition("techada", true);
    }
    else if (this.materialModelo)
      this.filterOneCondition("piso", this.materialModelo.toLowerCase());
    else
      this.modalController.dismiss(null);
  }


  filterOneCondition(condition, value) {
    this.firebaseAuth.filterOneCondition(condition, value, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }

  filterTwoConditions(condition1, value1, condition2, value2) {
    this.firebaseAuth.filterTwoConditions(condition1, value1, condition2, value2, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }

  filterTreeConditions(condition1, value1, condition2, value2, condition3, value3) {
    this.firebaseAuth.filterTreeConditions(condition1, value1, condition2, value2, condition3, value3, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }
}
