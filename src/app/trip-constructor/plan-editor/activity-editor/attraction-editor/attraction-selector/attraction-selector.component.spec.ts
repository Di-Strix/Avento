import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionSelectorComponent } from './attraction-selector.component';

describe('AttractionSelectorComponent', () => {
  let component: AttractionSelectorComponent;
  let fixture: ComponentFixture<AttractionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttractionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
