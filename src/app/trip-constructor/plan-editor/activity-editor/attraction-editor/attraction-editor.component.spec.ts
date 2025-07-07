import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionEditorComponent } from './attraction-editor.component';

describe('AttractionEditorComponent', () => {
  let component: AttractionEditorComponent;
  let fixture: ComponentFixture<AttractionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttractionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
