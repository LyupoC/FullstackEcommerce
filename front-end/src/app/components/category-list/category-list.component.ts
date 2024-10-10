import { Component, HostListener, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { NavigationEnd, Router } from '@angular/router';
declare var jQuery: any;


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  isDropdownOpen: boolean = false;
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductService, private router: Router) {

    // Subscribe to router events to close the dropdown menu on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
      }
    });
  }


  ngOnInit(): void {

    this.listProductCategories();
  }


  listProductCategories() {
    this.productCategoryService.getProductCategoryList().subscribe(data => {
      this.productCategories = data;

    });
  }
  toggleNavbar() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:mouseover', ['$event'])
  onEvent(event: MouseEvent) {

    const clickedElement = event.target as HTMLElement;
    const isDropdownToggle = clickedElement.classList.contains('dropdown-toggle');
    const isDropdownMenu = clickedElement.classList.contains('dropdown-menu');
    const isNavbar = clickedElement.closest('.navbar');

    if (!isDropdownToggle && !isDropdownMenu && !isNavbar) {
      this.isDropdownOpen = false;
    }
  }
}
