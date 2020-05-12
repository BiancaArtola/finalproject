import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage  {

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  public showText = true;
  slideOpts = {
    initialSlide: 0,
  };

  constructor(public storage: Storage, public modalController: ModalController) {
    storage.set('tutorial', true);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  slideChanged() {
    this.slides.getActiveIndex().then((index: number) => {
      if (index == 3) {
        this.showText = false;
      } else if (this.showText == false)
        this.showText = true;
    });
  }

}
