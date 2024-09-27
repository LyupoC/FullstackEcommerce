import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../common/product';
import { ModalLoadingComponent } from '../others/modal-loading/modal-loading.component';
import { ModalOrderTrackingNumberComponent } from '../others/modal-order-tracking-number/modal-order-tracking-number.component';
import { ModelItemAddedToCartComponent } from '../others/model-item-added-to-cart/model-item-added-to-cart.component';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogsService {

  loadingModalDialog: MatDialogRef<ModalLoadingComponent> | undefined;
  trackingNumberModalDialog: MatDialogRef<ModalOrderTrackingNumberComponent> | undefined;

  constructor(public dialog: MatDialog) { }


  openLoadingDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.closeLoadingDialog();

    this.loadingModalDialog = this.dialog.open(ModalLoadingComponent, {

      enterAnimationDuration,
      exitAnimationDuration
    });

  }

  closeLoadingDialog() {
    this.loadingModalDialog?.close();
  }

  openAddedToCartDialog(enterAnimationDuration: string, exitAnimationDuration: string, product: Product): void {
    this.dialog.open(ModelItemAddedToCartComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        "product": product
      }
    });
  }
 
  openOrderTrackingNumberDialog(enterAnimationDuration: string, exitAnimationDuration: string, trackingNumber: string): void {
    this.trackingNumberModalDialog = this.dialog.open(ModalOrderTrackingNumberComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        "trackingNumber": trackingNumber
      } 
    });

  }

  getTrackingNumberDialogCloseHandler() {
    return this.trackingNumberModalDialog!.afterClosed();
  }

}
