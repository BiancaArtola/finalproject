import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CanchaPage } from '../cancha/cancha.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { FiltersPage } from '../filters/filters.page';
import { OrderPage } from '../order/order.page';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage {

  private date;
  private actualDate: String = new Date().toISOString();
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  private sport: String;
  private canchas;



  constructor(private router: Router, private datePicker: DatePicker, private firebaseAuth: FirebaseAuth,
    public modalController: ModalController, private route: ActivatedRoute, private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sport = params['sport'];

      this.presentLoading().then(() => {
        this.firebaseAuth.getDocumentsWithSport(this.sport).then((information) => {
          this.canchas = information;
          this.loadingController.dismiss();
          console.log(this.canchas);

        });
      })

    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
  }

  /**
   * Metodo utilizado para abrir el selector de fecha y hora
   */
  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
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
    const modal = await this.modalController.create({
      component: CanchaPage,
      componentProps:
      {
        id: id
      }
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
    return await modal.present();
  }

  async order() {
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'my-custom-modal-css'
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.reorderArray(data);
  }

  reorderArray(data) {    
    if (data.condition.localeCompare("menor")==0) {
      this.canchas.sort(function (a, b) {
        if (a.precio > b.precio)
          return 1;
        else if (a.precio < b.precio)
          return -1;
        return 0;
      });
    } else if (data.condition.localeCompare("mayor")==0) {      
      this.canchas.sort(function (a, b) {
        if (a.precio < b.precio)
          return 1;
        else if (a.precio > b.precio)
          return -1;
        return 0;
      });
    }
  }
    
  }
