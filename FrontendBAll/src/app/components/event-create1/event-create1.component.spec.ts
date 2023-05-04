import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreate1Component } from './event-create1.component';

describe('EventCreate1Component', () => {
  let component: EventCreate1Component;
  let fixture: ComponentFixture<EventCreate1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCreate1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCreate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
