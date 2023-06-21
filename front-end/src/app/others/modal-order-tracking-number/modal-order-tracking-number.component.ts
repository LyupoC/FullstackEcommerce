import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-order-tracking-number',
  templateUrl: './modal-order-tracking-number.component.html',
  styleUrls: ['./modal-order-tracking-number.component.css']
})
export class ModalOrderTrackingNumberComponent implements OnInit {

  trackingNumber: string = '';
  constructor(public dialogRef: MatDialogRef<ModalOrderTrackingNumberComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.trackingNumber = this.data.trackingNumber;
  }

}
