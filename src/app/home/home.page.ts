import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavController, AlertController, ToastController} from "@ionic/angular";
import { AuthService } from '../auth.service';
import { Profiles } from '../models/profiles.model';
import { Router } from '@angular/router';
import { Appointments } from '../models/appointments.model';
import { AddAppointPage } from '../add-appoint/add-appoint.page';
import { AddProfilePage } from '../add-profile/add-profile.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { timeoutWith } from 'rxjs/operators';


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
  datetime =    this.currentdate.getFullYear() + "-"
                + (this.currentdate.getMonth()+1)  + "-" 
                + this.currentdate.getDate() + " "  
                + this.currentdate.getHours() + ":"  
                + this.currentdate.getMinutes() + ":" 
                + this.currentdate.getSeconds();

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

  dateFilter($event){
    this.isSelectedD = true;
    this.modifiedApp = this.modifiedApp.filter((app)=>{      
      if ($event.target.value=="Past"){
        return app.date <= this.datetime;        
      } if ($event.target.value=="Future"){
        return app.date > this.datetime;
      } if ($event.target.value=="" || $event.target.value==null){        
        return this.appoints;
      }
    });    
  }

  resetData(){
    this.dateselect = null;
    this.profselect = null;
    this.isSelectedP = false;
    this.isSelectedD = false;
    this.modifiedApp=JSON.parse(JSON.stringify(this.appoints));    
  }

  profileFilter($event){
    this.modifiedApp = this.modifiedApp.filter((app)=>{   
      if ($event.target.value==null || $event.target.value=="") {
        return true
      }  else {
        this.isSelectedP=true;        
        return app.id_profiles == $event.target.value;
      }
    });
  }

  doRefresh(event) {
    console.log('Refreshing...');
    window.location.reload();
    setTimeout(() => {
      console.log('Refreshed!');
      event.target.complete();
    }, 2000);
  }
}

