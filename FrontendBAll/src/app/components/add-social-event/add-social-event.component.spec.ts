import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialEventComponent } from './add-social-event.component';

describe('AddSocialEventComponent', () => {
  let component: AddSocialEventComponent;
  let fixture: ComponentFixture<AddSocialEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
