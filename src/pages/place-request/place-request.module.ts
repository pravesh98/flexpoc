import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceRequestPage } from './place-request';

@NgModule({
  declarations: [
    PlaceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceRequestPage),
  ],
})
export class PlaceRequestPageModule {}
