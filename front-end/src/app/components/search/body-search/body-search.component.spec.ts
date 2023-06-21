import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySearchComponent } from './body-search.component';

describe('BodySearchComponent', () => {
  let component: BodySearchComponent;
  let fixture: ComponentFixture<BodySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
