import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CanchaPage } from '../cancha/cancha.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseAuth } from 'src/services/FirebaseAuth';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage {

  private date;
  private actualDate: String = new Date().toISOString();

  private sport: String;
  private canchas;

  constructor(private router: Router, private datePicker: DatePicker,private firebaseAuth: FirebaseAuth,
    public modalController: ModalController, private route: ActivatedRoute, private loadingController: LoadingController) { }

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
       this.sport= params['sport'];

       this.presentLoading().then(()=>{
        this.firebaseAuth.getDocumentsWithSport(this.sport).then((information)=>{
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
    this.router.navigate(['/maps']);
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
}
