import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEventComponent } from './confirm-event.component';

describe('ConfirmEventComponent', () => {
  let component: ConfirmEventComponent;
  let fixture: ComponentFixture<ConfirmEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
