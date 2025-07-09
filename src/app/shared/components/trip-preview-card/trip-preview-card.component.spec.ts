import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPreviewCardComponent } from './trip-preview-card.component';

describe('TripPreviewCardComponent', () => {
  let component: TripPreviewCardComponent;
  let fixture: ComponentFixture<TripPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPreviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
