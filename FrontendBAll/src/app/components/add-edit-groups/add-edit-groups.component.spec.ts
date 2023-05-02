import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGroupsComponent } from './add-edit-groups.component';

describe('AddEditGroupsComponent', () => {
  let component: AddEditGroupsComponent;
  let fixture: ComponentFixture<AddEditGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
