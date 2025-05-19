import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepartmentComponent } from './liste-department.component';

describe('ListeDepartmentComponent', () => {
  let component: ListeDepartmentComponent;
  let fixture: ComponentFixture<ListeDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDepartmentComponent]
    });
    fixture = TestBed.createComponent(ListeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
