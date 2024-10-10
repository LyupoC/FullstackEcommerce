import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderTrackingNumberComponent } from './modal-order-tracking-number.component';

describe('ModalOrderTrackingNumberComponent', () => {
  let component: ModalOrderTrackingNumberComponent;
  let fixture: ComponentFixture<ModalOrderTrackingNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderTrackingNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderTrackingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
