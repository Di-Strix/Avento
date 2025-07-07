import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripConstructorComponent } from './trip-constructor.component';

describe('TripConstructorComponent', () => {
  let component: TripConstructorComponent;
  let fixture: ComponentFixture<TripConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripConstructorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
