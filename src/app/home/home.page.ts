import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private plt: Platform, public alertController: AlertController) {
    this.plt.ready().then(() => {
    });
  }
}
