import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Profiles } from '../profiles.model';
import { Router } from '@angular/router';
import { Appointments } from '../appointments.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  
  profile: Profiles[];
  appoints: Appointments[];

  constructor(private plt: Platform, public alertController: AlertController, private authService: AuthService, private router: Router)
   {}

  ngAfterViewInit(){
   this.authService.getAllAppoint().subscribe(response => {
    this.appoints = response;
  })
   this.authService.getProfiles().subscribe(response => {
    this.profile = response;
  })
  }
  deleteProfile(id_profiles){
    this.authService.deleteProfile(id_profiles).subscribe(()=>{
      this.profile = this.profile.filter(prof=>prof.id_profiles !== id_profiles)
    });
    this.router.navigateByUrl('/',{replaceUrl: true})
     
   }

  async presentAlertConfirm(id_profiles: string) {
    const alert = await this.alertController.create({
      header: 'You are deleting this appointment',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          text: 'Yes',
          role: 'Delete',
          handler: () => {
            this.authService.deleteProfile(id_profiles).subscribe(()=>{
              this.profile = this.profile.filter(prof=>prof.id_profiles !== id_profiles)
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

