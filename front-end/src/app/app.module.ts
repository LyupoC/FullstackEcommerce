import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderSearchComponent } from './components/search/header-search/header-search.component';
import { BodySearchComponent } from './components/search/body-search/body-search.component';
import { PaginationComponent } from './components/product-list/pagination/pagination.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelItemAddedToCartComponent } from './others/model-item-added-to-cart/model-item-added-to-cart.component';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ModalOrderTrackingNumberComponent } from './others/modal-order-tracking-number/modal-order-tracking-number.component';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalLoadingComponent } from './others/modal-loading/modal-loading.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    SearchComponent,
    HeaderSearchComponent,
    BodySearchComponent,
    PaginationComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ModelItemAddedToCartComponent,
    HomeComponent,
    ProductDetailComponent,
    ModalOrderTrackingNumberComponent,
    ModalLoadingComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
