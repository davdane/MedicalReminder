import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Platform, ToastController, NavController, ModalController, LoadingController, AlertController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from '../profiles.model';

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
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.maxLength(4),
    ])),
    altezza: new FormControl('', Validators.compose([
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.maxLength(6),
    ])),
    peso: new FormControl('', Validators.compose([
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.maxLength(6),
    ])),
  });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({ message: 'Creating...' });
    await loading.present();
    //if (this.isUpdate){
    //  this.AuthService.updateProfile(this.form.value).subscribe( response=>{
    //    this.ModalCtrl.dismiss(response, "Profile updated!")
    //  }

    //  )
    //}
    this.AuthService.createProfile(this.form.value).subscribe(
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
  async ToastProfile() {
    const toast = await this.toastCtrl.create({
      message: 'Profile added!',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    if (this.profile){
      this.isUpdate = true;
      this.form.setValue({nome: this.profile.nome, cognome: this.profile.cognome, age: this.profile.age, altezza: this.profile.altezza, peso: this.profile.peso});      
    }
  }

}
