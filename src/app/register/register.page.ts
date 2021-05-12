import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, ToastController, LoadingController, MenuController } from '@ionic/angular';


imports: [
        FormsModule,
        ReactiveFormsModule
]

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private menu : MenuController
  ) { }

  form = new FormGroup({

    email: new FormControl('', Validators.compose
    ([Validators.maxLength (70),
      Validators.pattern ("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"),
      Validators.required
    ])),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Registering...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      // If success
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Succesful registration!', duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }
  ionViewWillLeave(){
    this.menu.enable(true);
    this.menu.swipeGesture(true);
    }
  
  ionViewWillEnter(){
    this.menu.enable(false);
    this.menu.swipeGesture(false);
    }
}
