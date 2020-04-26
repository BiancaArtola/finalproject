import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.page.html',
  styleUrls: ['./home-popover.page.scss'],
})
export class HomePopoverPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }


  dismiss(){
    this.popoverController.dismiss();
  }
}
