import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Profiles } from '../profiles.model';
import { Router } from '@angular/router';
import { Appointments } from '../appointments.model';
import { AddAppointPage } from '../add-appoint/add-appoint.page';
import { AddProfilePage } from '../add-profile/add-profile.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  profile: Profiles[];
  appoints: Appointments[];

  constructor(private plt: Platform, public alertController: AlertController, private authService: AuthService, private router: Router, private modalCtrl: ModalController)
   {}

   ngOnInit() {
  }

  ionViewWillEnter(){
   this.authService.getAllAppoint().subscribe(response => {
    this.appoints = response;
  })
   this.authService.getProfiles().subscribe(response => {
    this.profile = response;
  })
  }
  deleteAppoint(id_appoint){
    this.authService.deleteAppoint(id_appoint).subscribe(()=>{
      this.appoints = this.appoints.filter(app=>app.id_appoint !== id_appoint)
    });     
   }

  addProfile(){
    this.modalCtrl.create({
      component: AddProfilePage
    }).then(modal=>modal.present())
   }

  updateApp(appoints: Appointments){
    console.log(appoints);
  }

  async presentAlertConfirm(id_appoint: string) {
    const alert = await this.alertController.create({
      header: 'You are deleting this appointment',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          text: 'Yes',
          role: 'Delete',
          handler: () => {
            this.authService.deleteAppoint(id_appoint).subscribe(()=>{
              this.appoints = this.appoints.filter(app=>app.id_appoint !== id_appoint)
            });
            console.log('Appointment deleted!');

          }
        }, {
          text: 'No',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });

    await alert.present();
  }
  doRefresh(event) {
    console.log('Refreshing...');

    setTimeout(() => {
      console.log('Refreshed!');
      event.target.complete();
    }, 2000);
  }
}

