import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaySelectorComponent } from './stay-selector.component';

describe('StaySelectorComponent', () => {
  let component: StaySelectorComponent;
  let fixture: ComponentFixture<StaySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
