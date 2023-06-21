import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { ModelItemAddedToCartComponent } from '../../others/model-item-added-to-cart/model-item-added-to-cart.component';
import { CartService } from '../../services/cart.service';
import { ModalDialogsService } from '../../services/modal-dialogs.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  newest: Product[] = [];

  highestRated: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService,
    private dialogService: ModalDialogsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.dialogService.openLoadingDialog('0ms', '5ms');
    this.productService.getNewest8Products().subscribe(newest8 => this.newest = newest8);
    this.productService.getHighestRated8Products().subscribe(highest8 => { this.highestRated = highest8, this.dialogService.closeLoadingDialog() });

  }


  addToCart(theProduct: Product) {

    this.cartService.addToCart(new CartItem(theProduct));
    this.dialogService.openAddedToCartDialog('0ms', '5ms', theProduct); 
  }

}
