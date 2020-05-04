import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular';
import { FilterService } from 'src/services/filter.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  @Input() sport: string;


  public monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  public hours = [];
  public cantidadJugadores = [5, 7, 9, 11];
  public materialPiso = ['Sintetico', 'Pasto', 'Ladrillo']
  public parts = [
    { val: 'Mañana (10-13 hs)', isChecked: false },
    { val: 'Tarde (16-18 hs)', isChecked: false },
    { val: 'Noche (19-23 hs)', isChecked: false }
  ];
  public tipoCancha = ['Futbol 5', 'Futbol 7', 'Futbol 9', 'Futbol 11'];

  public tipoCanchaModelo;
  public cantJugadoresModelo;
  public horariosModelo;
  public materialModelo;

  public horariosDisabled = false;
  public daysDisabled = false;
  public cantJugadoresDisabled = false;
  public tipoCanchaDisabled = false;
  public toggleChecked = false;

  constructor(public modalController: ModalController, public navParams: NavParams,
    public loadingController: LoadingController,
    public toastController: ToastController, public filterService: FilterService,
    public storage: Storage) {
    this.setHours();
    this.sport = navParams.get('sport');
    }
  

  ngOnInit() {
    this.getStorage();
  }


  getStorage() {
    this.storage.get('materialModelo').then((material) => {
      if (material)
        this.materialModelo = material;
    });
    this.storage.get('horariosModelo').then((horario) => {
      if (horario)
        this.horariosModelo = horario;
    });

    if (this.sport == "futbol") {
      this.storage.get('cantJugadoresModelo').then((jugadores) => {
        if (jugadores)
          this.cantJugadoresModelo = jugadores;
      });
      this.storage.get('tipoCanchaModelo').then((cancha) => {
        if (cancha)
          this.tipoCanchaModelo = cancha;
      });
    }
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

  saveStorage() {
    this.storage.set('materialModelo', this.materialModelo);
    this.storage.set('horariosModelo', this.horariosModelo);
    if (this.sport == "futbol") {
      this.storage.set('cantJugadoresModelo', this.cantJugadoresModelo);
      this.storage.set('tipoCanchaModelo', this.tipoCanchaModelo);
    }
  }

  filtrar() {
    this.saveStorage();
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
    this.filterService.filterOneCondition(condition, value, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }

  filterTwoConditions(condition1, value1, condition2, value2) {
    this.filterService.filterTwoConditions(condition1, value1, condition2, value2, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }

  filterTreeConditions(condition1, value1, condition2, value2, condition3, value3) {
    this.filterService.filterTreeConditions(condition1, value1, condition2, value2, condition3, value3, this.sport).then((canchas) => {
      this.loadingController.create();
      this.modalController.dismiss(canchas);
    })
  }
}
