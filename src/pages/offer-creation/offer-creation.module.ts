import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferCreationPage } from './offer-creation';

@NgModule({
  declarations: [
    OfferCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferCreationPage),
  ],
})
export class OfferCreationPageModule {}
