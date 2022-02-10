import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Platform, ToastController, NavController, ModalController, LoadingController, AlertController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from '../models/profiles.model';

imports: [
  FormsModule,
  ReactiveFormsModule
]

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.page.html',
  styleUrls: ['./add-profile.page.scss'],
})
export class AddProfilePage implements OnInit {

  @Input() profile: Profiles;
  isUpdate=false;

  constructor(
    private AuthService: AuthService,
    private plt: Platform,
    public toastCtrl: ToastController, 
    public navCtrl: NavController,
    public ModalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router
    ) {
    this.plt.ready().then(() => {
    });
  }

  form = new FormGroup({

    nome: new FormControl('', Validators.compose
    ([Validators.maxLength (36),
      Validators.required
    ])),
    cognome: new FormControl('', [
      Validators.maxLength(36),
    ]),
    age: new FormControl('', Validators.compose([
      
    ])),
    altezza: new FormControl('', Validators.compose([
      Validators.maxLength(6),
      Validators.pattern ("[0-9]{0,3}([.][0-9]{0,2})?"),
    ])),
    peso: new FormControl('', Validators.compose([
      Validators.maxLength(6),
      Validators.pattern ("[0-9]{0,3}([.][0-9]{0,2})?"),
    ]))
  });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({ message: 'Creating...' });
    await loading.present();
    if (this.isUpdate){
    this.AuthService.updateProfile(this.form.value, this.profile.id_profiles).subscribe(
      async()=>{
        const toast = await this.toastCtrl.create({ message: 'Profile updated!', duration: 8000, color: 'dark' });
        await toast.present();
        this.ModalCtrl.dismiss();
        loading.dismiss();
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      })
    }
     else {
    this.AuthService.createProfile(this.form.value).subscribe(
      // If success
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Profile created!', duration: 8000, color: 'dark' });
        await toast.present();
        this.ModalCtrl.dismiss();
        loading.dismiss();
        window.location.reload();
        
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      })
  }
}


  back(){
    this.ModalCtrl.dismiss();
  }
  
  ngOnInit() {
    if (this.profile){
      this.isUpdate = true;
      this.form.setValue({nome: this.profile.nome, cognome: this.profile.cognome, age: this.profile.age, altezza: this.profile.altezza, peso: this.profile.peso});      
    }
  }

}
