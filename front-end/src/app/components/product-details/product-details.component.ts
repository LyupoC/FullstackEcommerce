import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ModalDialogsService } from '../../services/modal-dialogs.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  id: number = 0;

  product: Product | undefined;

  itemCount: number = 1;

  price: number = 0;

  customOptions: OwlOptions = {
    items:1,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left text-dark " > </i>', '<i class="fas fa-chevron-right text-dark "></i >'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      }
    }

    
  }


  constructor(private route: ActivatedRoute,
    private productsService: ProductService,
    private dialogService: ModalDialogsService,
    private cartService: CartService) { }

  ngOnInit(): void {

    this.dialogService.openLoadingDialog('0ms', '5ms');

    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasProductId) {
      this.id = +this.route.snapshot.paramMap.get('id')!;


      this.productsService.getProduct(this.id).subscribe(
        data => {
          this.product = data;
          this.price = this.product.unitPrice;
          this.dialogService.closeLoadingDialog();
        }
      );


    }
    
  }

  addToCart(theProduct: Product) {


    for (let i = 0; i < this.itemCount; i++)
        this.cartService.addToCart(new CartItem(theProduct));


    this.dialogService.openAddedToCartDialog('0ms', '5ms', theProduct, this.itemCount);

  }


  incrementItemCount() {

    this.itemCount = Math.min(++this.itemCount, 15);;
    this.price = this.itemCount * (this.product?.unitPrice??1);

  }


  decrementItemCount() {

   
    this.itemCount = Math.max(--this.itemCount, 1);
    this.price = this.itemCount * (this.product?.unitPrice??1);

  }


}

