import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAppointPageRoutingModule } from './add-appoint-routing.module';

import { AddAppointPage } from './add-appoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAppointPageRoutingModule
  ],
  declarations: [AddAppointPage]
})
export class AddAppointPageModule {}
