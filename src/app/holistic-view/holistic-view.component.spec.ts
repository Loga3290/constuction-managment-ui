import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolisticViewComponent } from './holistic-view.component';

describe('HolisticViewComponent', () => {
  let component: HolisticViewComponent;
  let fixture: ComponentFixture<HolisticViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolisticViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolisticViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
