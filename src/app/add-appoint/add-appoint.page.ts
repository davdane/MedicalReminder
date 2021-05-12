import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Appointment, Profile } from '../servic/storage.service';
import { Platform } from "@ionic/angular";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-appoint',
  templateUrl: './add-appoint.page.html',
  styleUrls: ['./add-appoint.page.scss'],
})
export class AddAppointPage implements OnInit {

  profiles: Profile[]=[];
  newProfiles: Profile=<Profile>{};
  appointments: Appointment[]=[];
  newAppointment: Appointment=<Appointment>{};

  constructor(private storageService: StorageService, private plt: Platform, public toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadAppointments();
      this.loadProfiles();
    });
   }

   loadProfiles(){
     this.storageService.getProfiles().then(items => {
       this.profiles=items;
     });
   }
   //CREATE
  addAppointment() {
    this.newAppointment.id = Date.now();
    this.storageService.addAppointment(this.newAppointment).then(item => {
      this.newAppointment=<Appointment>{};
      this.loadAppointments();
      this.ToastAppointment()
    });
  }
  //READ
  loadAppointments(){
    this.storageService.getAppointments().then(items => {
      this.appointments=items;
    });
  }
  //UPDATE
  updateAppointment(item: Appointment) {
    item.title='${Appointment.title}';

    this.storageService.updateAppointment(item).then(items => {
      this.loadAppointments();
    });
  }
  //DELETE
  deleteAppointment(item) {
    this.storageService.deleteAppointment(item).then(items => {
      this.loadAppointments();
      alert("Appointment deleted!");
    });
  }
  ngOnInit() {
  }

  async ToastAppointment() {
    const toast = await this.toastController.create({
      message: 'Appointment added!',
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    this.loadAppointments();

    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

  }
}
