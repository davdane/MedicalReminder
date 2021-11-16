import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from "@ionic/angular";
import { ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Appointments } from '../appointments.model';
import { Profiles } from '../profiles.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';

imports: [
  FormsModule,
  ReactiveFormsModule
]



@Component({
  selector: 'app-add-appoint',
  templateUrl: './add-appoint.page.html',
  styleUrls: ['./add-appoint.page.scss'],
})
export class AddAppointPage{

  profile: Profiles[];
  appoints: Appointments[];

  constructor(
    private authService: AuthService,
    private plt: Platform, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private ModalCtrl: ModalController,
    
    ) {
    this.plt.ready().then(() => {
      this.authService.getProfiles().subscribe(response => {
        this.profile = response;
      })
    });
   }

   form = new FormGroup({

    title: new FormControl('', Validators.compose
    ([Validators.maxLength (24),
      Validators.required
    ])),
    desc: new FormControl('', [
      Validators.maxLength(64),
    ]),
    place: new FormControl('', Validators.compose([
      Validators.maxLength(32),
    ])),
    
  });


   async onSubmit(){
    const loading = await this.loadingCtrl.create({ message: 'Creating...' });
    await loading.present();
    
    this.authService.createProfile(this.form.value).subscribe(
      // If success
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Profile created!', duration: 8000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.router.navigateByUrl('/home',{replaceUrl: true});
        
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      })
  }

  back(){
    this.ModalCtrl.dismiss();
  }
  
  async ToastAppointment() {
    const toast = await this.toastCtrl.create({
      message: 'Appointment added!',
      duration: 2000
    });
    toast.present();
  }

 
}
