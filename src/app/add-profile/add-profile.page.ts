import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from "@ionic/angular";
import { ToastController, NavController, ModalController, LoadingController} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';

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

  constructor(
    private AuthService: AuthService,
    private plt: Platform,
    public toastController: ToastController, 
    public navCtrl: NavController,
    public ModalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {
    this.plt.ready().then(() => {
    });
  }

  form = new FormGroup({
    nome: new FormControl('', Validators.compose ([
      Validators.maxLength (70),
      Validators.required,
      Validators.minLength(3),
    ]))
  });

  async onSubmit(form:NgForm){
    const profile = form.value;
    this.AuthService.createProfile(profile).subscribe(response=>console.log(response))
  }

  back(){
    this.ModalCtrl.dismiss();
  }
  async ToastProfile() {
    const toast = await this.toastController.create({
      message: 'Profile added!',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
