import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
declare var jQuery: any;


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductService) { }


  ngOnInit(): void {

    this.listProductCategories();
  }


  listProductCategories() {
    this.productCategoryService.getProductCategoryList().subscribe(data => {
      this.productCategories = data;

    });
  }
}
