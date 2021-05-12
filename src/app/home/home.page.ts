import { Component } from '@angular/core';
import { StorageService, Profile, Appointment } from '../servic/storage.service';
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

profiles: Profile[]=[];
newProfiles: Profile=<Profile>{};

appointments: Appointment[]=[];
newAppointment: Appointment=<Appointment>{};

  constructor(private storageService: StorageService, private plt: Platform, public alertController: AlertController) {
    this.plt.ready().then(() => {
      this.loadProfiles();
      this.loadAppointments();
    });
  }
  //READ
  loadProfiles(){
    this.storageService.getProfiles().then(items => {
      this.profiles=items;
    });
  }
  //DELETE
  deleteProfile(item: Profile) {
    this.storageService.deleteProfile(item.id).then(items => {
      this.loadProfiles();
     });
  }
 

  loadAppointments(){
    this.storageService.getAppointments().then(items => {
      this.appointments=items;
    });
  }

  deleteAppointment(item: Appointment) {
    this.storageService.deleteAppointment(item.id).then(items => {
      this.loadAppointments();
    });
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    this.loadAppointments();
    this.loadProfiles();

    console.log('Reloading...');

    setTimeout(() => {
      console.log('Reloading complete!');
      event.target.complete();
    }, 1000);

  }

  async presentAlertConfirm(item: Appointment) {
      const alert = await this.alertController.create({
        header: 'You are deleting this appointment',
        message: 'Are you sure you want to delete this appointment?',
        buttons: [
          {
            text: 'Yes',
            role: 'Delete',
            handler: () => {
              this.deleteAppointment(item);
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


}
