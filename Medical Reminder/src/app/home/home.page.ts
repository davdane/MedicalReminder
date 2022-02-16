import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavController, AlertController, ToastController} from "@ionic/angular";
import { AuthService } from '../auth.service';
import { Profiles } from '../models/profiles.model';
import { Appointments } from '../models/appointments.model';
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
  modifiedApp: any;
  dateselect: string;
  profselect: string;
  isSelectedP=false;
  isSelectedD=false;

  currentdate = new Date();  
  

  constructor(
    private plt: Platform, 
    public alertController: AlertController, 
    private authService: AuthService, 
    private NavCtrl: NavController, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
    )
   {
     
   }

   ngOnInit() {
     
  }

  toIsoString(date) { //get the right format of the current date to compare
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  closeDate(date) {  //used check if the date of the appointment is closer than a week 
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate() + 7) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  ionViewWillEnter(){
   this.authService.getAllAppoint().subscribe(response => {
    this.appoints = response;
    this.modifiedApp=JSON.parse(JSON.stringify(this.appoints));
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

  addAppoint(){
    this.modalCtrl.create({
      component: AddAppointPage
    }).then(modal=>modal.present())
   }
  updateApp(appoints: Appointments){
    this.modalCtrl.create({
      component: AddAppointPage,
      componentProps: {appoints}
    }).then(modal=>modal.present())
  }

  async presentAlertConfirm(id_appoint: string) {
    const alert = await this.alertController.create({
      header: 'You are deleting this appointment',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          text: 'Yes',
          role: 'Delete',
          handler: async () => {
            this.deleteAppoint(id_appoint);
            const toast=this.toastCtrl.create({ message: 'Appointment deleted!', duration: 8000, color: 'dark' });
            (await toast).present();
            window.location.reload();

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

  dateFilter($event){ // filter for future/past appointments
    this.isSelectedD = true;
    this.modifiedApp = this.modifiedApp.filter((app)=>{      
      if ($event.target.value=="Past"){
        return app.date < this.toIsoString(this.currentdate).slice(0, 19).replace('T', ' ');        
      } if ($event.target.value=="Future"){
        return app.date >= this.toIsoString(this.currentdate).slice(0, 19).replace('T', ' ');
      } if ($event.target.value=="" || $event.target.value==null){        
        return this.appoints;
      }
    });    
  }

  resetData(){ //reset the filter
    this.dateselect = null;
    this.profselect = null;
    this.isSelectedP = false;
    this.isSelectedD = false;
    this.modifiedApp=JSON.parse(JSON.stringify(this.appoints));    
  }

  profileFilter($event){ //filter to view appointments of the selected profile
    this.modifiedApp = this.modifiedApp.filter((app)=>{   
      if ($event.target.value==null || $event.target.value=="") {
        return true
      }  else {
        this.isSelectedP=true;        
        return app.id_profiles == $event.target.value;
      }
    });
  }

  doRefresh(event) { //slide down to refresh the page
    console.log('Refreshing...');
    window.location.reload();
    setTimeout(() => {
      console.log('Refreshed!');
      event.target.complete();
    }, 2000);
  }
}

