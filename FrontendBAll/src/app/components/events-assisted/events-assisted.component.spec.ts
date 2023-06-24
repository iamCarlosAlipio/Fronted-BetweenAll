import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAssistedComponent } from './events-assisted.component';

describe('EventsAssistedComponent', () => {
  let component: EventsAssistedComponent;
  let fixture: ComponentFixture<EventsAssistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAssistedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAssistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
