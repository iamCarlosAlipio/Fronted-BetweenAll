import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBuy1Component } from './confirm-buy1.component';

describe('ConfirmBuy1Component', () => {
  let component: ConfirmBuy1Component;
  let fixture: ComponentFixture<ConfirmBuy1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBuy1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmBuy1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
