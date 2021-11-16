import { Component, OnInit } from '@angular/core';
import { Platform  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Profiles } from './profiles.model';
import { Appointments } from './appointments.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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

 deleteProfile(id_profiles: string){
  this.authService.deleteProfile(id_profiles).subscribe(()=>{
    this.profile = this.profile.filter(prof=>prof.id_profiles !== id_profiles)
  })
 }

async logoutClicked(){
  localStorage.removeItem("token");
  this.router.navigateByUrl('/',{replaceUrl: true})
}

 }
