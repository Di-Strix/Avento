import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLikeButtonComponent } from './trip-like-button.component';

describe('TripLikeButtonComponent', () => {
  let component: TripLikeButtonComponent;
  let fixture: ComponentFixture<TripLikeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripLikeButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripLikeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
