import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEditorComponent } from './info-editor.component';

describe('InfoEditorComponent', () => {
  let component: InfoEditorComponent;
  let fixture: ComponentFixture<InfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
