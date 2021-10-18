import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private plt: Platform, public alertController: AlertController, private authService: AuthService,) {
    this.plt.ready().then(() => {
      this.authService.getProfiles("1"),
      console.log()
    });
  }

}
