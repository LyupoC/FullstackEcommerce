import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Product } from '../../common/product';


@Component({
  selector: 'app-model-item-added-to-cart',
  templateUrl: './model-item-added-to-cart.component.html',
  styleUrls: ['./model-item-added-to-cart.component.css'],

})
export class ModelItemAddedToCartComponent implements OnInit {
  product: Product | undefined;
  constructor(public dialogRef: MatDialogRef<ModelItemAddedToCartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.product = this.data.product;
    
  }

}
