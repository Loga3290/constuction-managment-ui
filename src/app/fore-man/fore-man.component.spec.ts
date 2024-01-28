import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeManComponent } from './fore-man.component';

describe('ForeManComponent', () => {
  let component: ForeManComponent;
  let fixture: ComponentFixture<ForeManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeManComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
