import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchaPage } from '../cancha/cancha.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage {

  private date;
  private actualDate: String = new Date().toISOString();

  constructor(private router: Router, private datePicker: DatePicker,
    public modalController: ModalController) { }


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

  async openCourts() {
    const modal = await this.modalController.create({
      component: CanchaPage,
    });
    return await modal.present();
  }
}
