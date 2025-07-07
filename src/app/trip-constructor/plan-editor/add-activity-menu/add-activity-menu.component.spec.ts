import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityMenuComponent } from './add-activity-menu.component';

describe('AddActivityMenuComponent', () => {
  let component: AddActivityMenuComponent;
  let fixture: ComponentFixture<AddActivityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActivityMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddActivityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
