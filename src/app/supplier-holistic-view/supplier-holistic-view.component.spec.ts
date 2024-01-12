import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHolisticViewComponent } from './supplier-holistic-view.component';

describe('SupplierHolisticViewComponent', () => {
  let component: SupplierHolisticViewComponent;
  let fixture: ComponentFixture<SupplierHolisticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierHolisticViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierHolisticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
