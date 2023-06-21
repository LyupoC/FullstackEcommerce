import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../../common/address';
import { CartItem } from '../../common/cart-item';
import { Customer } from '../../common/customer';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { ModalOrderTrackingNumberComponent } from '../../others/modal-order-tracking-number/modal-order-tracking-number.component';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { CustomFormValidators } from '../../validators/custom-form-validators';
import { Router } from '@angular/router'; 
import { ModalDialogsService } from '../../services/modal-dialogs.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],

  host: {
    class: "row"
  }
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];

  subTotalPrice: number = 0;
  totalPrice: number = 0;
  shipping: number = 10;
  totalQuantity: number = 0;

  checkoutFormGroup: FormGroup = this.formBuilder.nonNullable.group({

    billingAddress: this.formBuilder.nonNullable.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), CustomFormValidators.notOnlyWhiteSpace]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      addressLine1: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      addressLine2: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      state: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      zip: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace])
    }),

    shippingAddress: this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), CustomFormValidators.notOnlyWhiteSpace]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      addressLine1: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      addressLine2: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      state: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace]),
      zip: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhiteSpace])
    }),

    customCheckBoxes: this.formBuilder.group({
      createAccountCheckbox: [''],
      shippingAddressCheckbox: ['']
    }),

  });

  constructor(private cartService: CartService, private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private dialogService: ModalDialogsService,
    public dialog: MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  onSubmit() {
    if (this.checkoutFormGroup != undefined) {

      let billingAdress = this.checkoutFormGroup.get('billingAddress');
      let shippingAddress = this.checkoutFormGroup.get('shippingAddress');
      let customCheckBoxes = this.checkoutFormGroup.get('customCheckBoxes');

      if (customCheckBoxes!.value['shippingAddressCheckbox'] && this.checkoutFormGroup.invalid) {
        this.checkoutFormGroup.markAllAsTouched();
        return;

      }
      else if (!customCheckBoxes!.value['shippingAddressCheckbox'] && billingAdress!.invalid) {
        billingAdress!.markAllAsTouched();
        return;
      }

      let customer = new Customer(billingAdress!.value.firstName, billingAdress!.value.lastName, billingAdress!.value.email );
      let shAddress = new Address(shippingAddress!.value.street, shippingAddress!.value.city, shippingAddress!.value.state,
        shippingAddress!.value.zipCode);

      let bilAddress = new Address(billingAdress!.value.street, billingAdress!.value.city, billingAdress!.value.state,
        billingAdress!.value.zipCode);


      let order = new Order(this.totalQuantity, this.totalPrice)
      let purchase: Purchase = new Purchase(customer, shAddress, bilAddress, order, this.cartItems.map(c => new OrderItem(c)));

      this.dialogService.openLoadingDialog('0ms', '5ms');
      this.checkoutService.purchase(purchase).subscribe(data => {
        this.dialogService.closeLoadingDialog();
        this.dialogService.openOrderTrackingNumberDialog('0ms', '5ms', data.orderTrackingNumber);

        this.dialogService.getTrackingNumberDialogCloseHandler().subscribe(() => {
          this.cartService.empty();
          this.router.navigate(["/home"]);
        });
        
      });
     
    }
  }

  listCartDetails() {

    this.cartService.totalPrice.subscribe(
      data => { this.subTotalPrice = data; this.totalPrice = data + this.shipping; }
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartItems = this.cartService.cartItems;

    this.cartService.computeCartTotals();
  }


  //Billing first Name
  get billingFirstName() { return this.checkoutFormGroup.get('billingAddress.firstName'); }
  get billingLastName() { return this.checkoutFormGroup.get('billingAddress.lastName');}
  get billingEmail() { return this.checkoutFormGroup.get('billingAddress.email'); }

  get billingZip() { return this.checkoutFormGroup.get('billingAddress.zip'); }
  get billingCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingMobile() { return this.checkoutFormGroup.get('billingAddress.mobile'); }
  get billingAddressLine1() { return this.checkoutFormGroup.get('billingAddress.addressLine1'); }
  get billingAddressLine2() { return this.checkoutFormGroup.get('billingAddress.addressLine2'); }


  //Shipping first Name
  get shippingFirstName() { return this.checkoutFormGroup.get('shippingAddress.firstName'); }
  get shippingLastName() { return this.checkoutFormGroup.get('shippingAddress.lastName'); }
  get shippingEmail() { return this.checkoutFormGroup.get('shippingAddress.email'); }

  get shippingCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingZip() { return this.checkoutFormGroup.get('shippingAddress.zip'); }
  get shippingCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingMobile() { return this.checkoutFormGroup.get('shippingAddress.mobile'); }
  get shippingAddressLine1() { return this.checkoutFormGroup.get('shippingAddress.addressLine1'); }
  get shippingAddressLine2() { return this.checkoutFormGroup.get('shippingAddress.addressLine2'); }

}
