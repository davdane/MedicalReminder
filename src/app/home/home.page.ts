import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Profiles } from '../profiles.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  profile: Profiles[];

  constructor(private plt: Platform, public alertController: AlertController, private authService: AuthService)
   {}

ngOnInit(){
   this.authService.getProfiles().subscribe(response => {
    this.profile = response;
  })
  }
}

