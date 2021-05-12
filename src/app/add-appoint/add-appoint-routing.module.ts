import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppointPage } from './add-appoint.page';

const routes: Routes = [
  {
    path: '',
    component: AddAppointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAppointPageRoutingModule {}
