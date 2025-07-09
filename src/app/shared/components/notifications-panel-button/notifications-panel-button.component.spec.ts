import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPanelButtonComponent } from './notifications-panel-button.component';

describe('NotificationsPanelButtonComponent', () => {
  let component: NotificationsPanelButtonComponent;
  let fixture: ComponentFixture<NotificationsPanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPanelButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
