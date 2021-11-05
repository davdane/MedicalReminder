import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Profiles } from './profiles.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  
  profile: Profiles [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
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

 }
