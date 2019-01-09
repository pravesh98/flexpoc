import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListingPage } from './order-listing';


@NgModule({
  declarations: [
    OrderListingPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListingPage),
  ],
})
export class OrderListingPageModule {}
