import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayEditorComponent } from './stay-editor.component';

describe('StayEditorComponent', () => {
  let component: StayEditorComponent;
  let fixture: ComponentFixture<StayEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StayEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
