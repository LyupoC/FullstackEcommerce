import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';


import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModelItemAddedToCartComponent } from '../../others/model-item-added-to-cart/model-item-added-to-cart.component';
import { ModalDialogsService } from '../../services/modal-dialogs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],

})



export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  productName: string = "";

  pageNumber: number = 1;
  pageSize : number = 10;
  totalElements:number = 0;

  previousCategoryId: number = this.currentCategoryId;


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private dialogService: ModalDialogsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.dialogService.openLoadingDialog('0ms', '5ms');
    const hasSearchParameter: boolean = this.route.snapshot.paramMap.has('keyword');

    if (hasSearchParameter) {
      this.searchProduct();
    }
    else {
      this.handleListProducts();
    }

  }

  searchProduct() {

    const keyWord = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProductList(keyWord).subscribe(
      data => {
        this.products = data;
        this.dialogService.closeLoadingDialog();
      }
    );

  }

  handleListProducts(){ 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      if (this.currentCategoryId !== this.previousCategoryId) {

        this.pageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;
    }
    else { this.currentCategoryId = 1; }

    this.productService.getProductsPaginate(this.pageNumber -1, this.pageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.totalElements = data.page.totalElements;
        this.dialogService.closeLoadingDialog()
      }
    )

  }

  addToCart(theProduct: Product) {

    this.cartService.addToCart(new CartItem(theProduct));
    this.dialogService.openAddedToCartDialog('0ms', '5ms', theProduct);
  }

  navigateToProductDetail(event:MouseEvent, theProduct: Product) {

    const onClickedElement = event.target as HTMLElement;

    if (onClickedElement.tagName != 'A' && onClickedElement.parentElement?.tagName != 'A') {
      this.router.navigate(['/products', theProduct.id]);
    }
  }



}
