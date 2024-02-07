import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormanAdvanceComponent } from './forman-advance.component';

describe('FormanAdvanceComponent', () => {
  let component: FormanAdvanceComponent;
  let fixture: ComponentFixture<FormanAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormanAdvanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormanAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
