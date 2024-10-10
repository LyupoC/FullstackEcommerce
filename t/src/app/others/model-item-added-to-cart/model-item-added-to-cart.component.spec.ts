import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelItemAddedToCartComponent } from './model-item-added-to-cart.component';

describe('ModelItemAddedToCartComponent', () => {
  let component: ModelItemAddedToCartComponent;
  let fixture: ComponentFixture<ModelItemAddedToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelItemAddedToCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelItemAddedToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
