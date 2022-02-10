import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Profiles } from './models/profiles.model';
import { Appointments } from './models/appointments.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AddProfilePage } from './add-profile/add-profile.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  
  profile: Profiles [];
  appoint: Appointments[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();

  }

  initializeApp()
  {
    this.platform.ready().then(() =>
    {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   }
   ngOnInit(){
    this.authService.getProfiles().subscribe(response => {
      this.profile = response;
    })
    }
    
    addProfile(){
      this.modalCtrl.create({
        component: AddProfilePage
      }).then(modal=>modal.present())
     }

 deleteProfile(id_profiles: string){
  this.authService.deleteProfile(id_profiles).subscribe(()=>{
    this.profile = this.profile.filter(prof=>prof.id_profiles !== id_profiles)
  })
 }

 async presentAlertConfirm(id_profiles: string) {
  const alert = await this.alertCtrl.create({
    header: 'You are deleting this profile.',
    message: 'Deleting the profile will delete its related appointments. Are you sure?',
    buttons: [
      {
        text: 'Yes',
        role: 'Delete',
        handler: () => {
          this.deleteProfile(id_profiles);
          this.toastCtrl.create({ message: 'Appointment deleted!', duration: 8000, color: 'dark' });
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


 updateProf(profile: Profiles){
  this.modalCtrl.create({
    component: AddProfilePage,
    componentProps: {profile}
  }).then(modal => modal.present());
}

async logoutClicked(){
  localStorage.removeItem("token");
  this.router.navigateByUrl('/register',{replaceUrl: true})
}

 }
