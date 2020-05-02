import { Component } from '@angular/core';
import { ModalController, LoadingController, MenuController } from '@ionic/angular';
import { CanchaPage } from '../cancha/cancha.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { FiltersPage } from '../filters/filters.page';
import { OrderPage } from '../order/order.page';
import { Storage } from '@ionic/storage';
import { MessagePage } from '../message/message.page';
import { CanchasService } from 'src/services/canchas.service';


@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage {

  private date;
  private actualDate: String = new Date().toISOString();
  private maxDay;

  private dateModel = new Date().toISOString();

  private monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  private sport: String;
  private canchas;

  private loading = true;


  constructor(private router: Router, private datePicker: DatePicker,
    private canchasService: CanchasService, private menuCtrl: MenuController,
    public modalController: ModalController, private route: ActivatedRoute,
    private loadingController: LoadingController, private storage: Storage) {
    this.maxDay = new Date();
    this.maxDay.setDate(this.maxDay.getDate() + 10);
    this.maxDay = this.maxDay.toISOString();

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sport = params['sport'];

      this.canchasService.getDocumentsWithSport(this.sport).then((information) => {
        this.canchas = information;
        this.loading = false;
      });

    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
  }


  async openMaps() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.canchas)
      }
    };
    this.router.navigate(['/maps'], navigationExtras);
    // API AIzaSyD_mVCh6mJWkCl-rmCyWITJdMHIIqr-PRE
  }

  async openCourts(id: number) {
    this.clearStorage();
    const modal = await this.modalController.create({
      component: CanchaPage,
      componentProps:
      {
        id: id,
        date: this.dateModel
      },
      id: "canchaModal"
    });
    return await modal.present();
  }


  async filter() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      componentProps:
      {
        sport: this.sport
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data != null) {
      this.canchas = data;
      this.loadingController.dismiss();
    }
    else {
      this.canchasService.getDocumentsWithSport(this.sport).then((information) => {
        this.canchas = information;
        this.loadingController.dismiss();
      });
    }
  }

  async order() {
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'my-custom-modal-css2'
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data)
      this.reorderArray(data);
  }

  reorderArray(data) {
    if (data.condition.localeCompare("menor") == 0) {
      this.canchas.sort(function (a, b) {
        if (a.precio > b.precio)
          return 1;
        else if (a.precio < b.precio)
          return -1;
        return 0;
      });
    } else if (data.condition.localeCompare("mayor") == 0) {
      this.canchas.sort(function (a, b) {
        if (a.precio < b.precio)
          return 1;
        else if (a.precio > b.precio)
          return -1;
        return 0;
      });
    } else if (data.condition.localeCompare("alfabeticamente") == 0) {
      this.canchas.sort(function (a, b) {
        if (a.nombre > b.nombre)
          return 1;
        else if (a.nombre < b.nombre)
          return -1;
        return 0;
      });
    }
  }


  clearStorage() {
    this.storage.set('materialModelo', null);
    this.storage.set('horariosModelo', null);

    this.storage.set('cantJugadoresModelo', null);
    this.storage.set('tipoCanchaModelo', null);
  }

  async openMessages() {
    const modal = await this.modalController.create({
      component: MessagePage,
    });
    return await modal.present();
  }

}
