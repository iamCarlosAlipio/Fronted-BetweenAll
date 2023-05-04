import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMygroupcreatedComponent } from './details-mygroupcreated.component';

describe('DetailsMygroupcreatedComponent', () => {
  let component: DetailsMygroupcreatedComponent;
  let fixture: ComponentFixture<DetailsMygroupcreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMygroupcreatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMygroupcreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
