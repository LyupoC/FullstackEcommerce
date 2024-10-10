import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModalDialogsService } from '../../services/modal-dialogs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  productCountsPerFlag: Record<string, number> = {};
  currentCategoryId: number = 1;
  productName: string = '';
  keyWords: string = '';
  sortBy: string | null = null;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  value: number = 15;
  highValue: number = 60;
  options: Options = { floor: 0, ceil: 100 };
  previousCategoryId: number = this.currentCategoryId;
  filterButtonPressed: boolean = false;
  checkboxForm: FormGroup;
  checkboxData: string[] = ['In Stock', 'On Sale', 'Staff Pick', 'Limited'];
  checkboxDataCounts: { flag: string; counts: number }[] = [];
  private subscriptions: Subscription = new Subscription();

  @ViewChild('multiRangeSlider', { static: true }) multiRangeSliderElement!: ElementRef;

  constructor(
    private searchService: SearchService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private dialogService: ModalDialogsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.checkboxForm = this.formBuilder.group(
      this.checkboxData.reduce((controls, option) => {
        controls[option] = false;
        return controls;
      }, {} as Record<string, boolean>)
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(this.searchService.keyword$.subscribe(keyword => {
      this.keyWords = keyword;
      this.pageNumber = 1;

      this.listProducts();
    }));

    this.subscriptions.add(this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.currentCategoryId = +categoryId;
      }
      this.listProducts();
    }));
  }

  ngAfterViewInit() {
    // Slider initialization can be added here if needed
  }

  listProducts() {
    this.dialogService.openLoadingDialog('0ms', '5ms');
    const hasId = this.route.snapshot.paramMap.has('id');
    const hasKeyWord = this.keyWords !== '';

    hasKeyWord && !hasId ? this.searchProduct() : this.handleListProducts();
  }

  searchProduct() {

    this.currentCategoryId = 0;
    this.filterPriceRange();
  }

  sortFieldSelected(sortField: string) {
    this.sortBy = sortField;
    this.filterPriceRange();
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {

      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      if (this.currentCategoryId !== this.previousCategoryId) {

        const keyWordPresent = this.keyWords !== '';

        if (keyWordPresent) {
          this.searchService.clearKeyword();
        }

        this.pageNumber = 1;
        this.resetForm();
      }

      this.previousCategoryId = this.currentCategoryId;

    } else {
      this.currentCategoryId = 0;
    }

    this.filterPriceRange();
  }

  resetForm() {
    this.value = 15;
    this.highValue = 60;
    this.checkboxForm.reset();
    this.filterButtonPressed = false;

 
    
  }

  addToCart(theProduct: Product) {
    this.cartService.addToCart(new CartItem(theProduct));
    this.dialogService.openAddedToCartDialog('0ms', '5ms', theProduct);
  }

  setFilterButtonPressed() {
    this.filterButtonPressed = true;
    this.pageNumber = 1;
    this.filterPriceRange();
  }

  filterPriceRange() {
    const page = this.pageNumber - 1;
    const category = this.currentCategoryId === 0 ? null : this.currentCategoryId;

    const { value, highValue, inStock, inOnSale, isLimited, isStaffRecommended } = this.getFilterValues();

    this.productService.getProductsFilterPaginate(page, this.pageSize, category, value, highValue, inStock, inOnSale, isLimited, isStaffRecommended, this.sortBy, this.keyWords).subscribe(data => {
      this.products = data._embedded.products;
      this.totalElements = data.page.totalElements;
      this.productCountsPerFlag = data.productFlags;
      this.updateCheckboxDataCounts(data.productFlags);
      this.dialogService.closeLoadingDialog();
    });
  }

  private getFilterValues() {
    let value = this.value;
    let highValue = this.highValue;
    let inStock = false;
    let inOnSale = false;
    let isLimited = false;
    let isStaffRecommended = false;

    if (this.filterButtonPressed) {
      const selectedCheckboxes = this.checkboxData.filter(option => this.checkboxForm.value[option]);
      inStock = selectedCheckboxes.includes("In Stock");
      inOnSale = selectedCheckboxes.includes("On Sale");
      isLimited = selectedCheckboxes.includes("Limited");
      isStaffRecommended = selectedCheckboxes.includes("Staff Pick");
    }

    return { value, highValue, inStock, inOnSale, isLimited, isStaffRecommended };
  }



  navigateToProductDetail(event: MouseEvent, theProduct: Product) {

    const onClickedElement = event.target as HTMLElement;

    //make sure that it does not anvigate if add to Cart is pressed
    if (onClickedElement.tagName != 'A' && onClickedElement.parentElement?.tagName != 'A') {
      this.router.navigate(['/products', theProduct.id]);
    }
  }

  private updateCheckboxDataCounts(productFlags: Record<string, number>) {

    this.checkboxDataCounts = Object.entries(productFlags).map(([key, value]) => {
      const flagNames: Record<string, string> = {
        inStockCount: "In Stock",
        onSaleCount: "On Sale",
        staffRecommendedCount: "Staff Pick",
        limitedCount: "Limited"
      };

      return { flag: flagNames[key] || key, counts: value };
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); 
  }
}

