import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAppointPageRoutingModule } from './add-appoint-routing.module';

import { AddAppointPage } from './add-appoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAppointPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddAppointPage]
})
export class AddAppointPageModule {}
