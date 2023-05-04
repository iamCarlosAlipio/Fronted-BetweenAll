import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMygroupComponent } from './details-mygroup.component';

describe('DetailsMygroupComponent', () => {
  let component: DetailsMygroupComponent;
  let fixture: ComponentFixture<DetailsMygroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMygroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
