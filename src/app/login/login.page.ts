import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, ToastController, LoadingController, NavController, MenuController } from '@ionic/angular';


imports: [
        FormsModule,
        ReactiveFormsModule
]

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private menu : MenuController
  ) { 

  }

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
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async token => {
        localStorage.setItem('token', token);
        loading.dismiss();
        this.navCtrl.navigateRoot("/home");
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
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
