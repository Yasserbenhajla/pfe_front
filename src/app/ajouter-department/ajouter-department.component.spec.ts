import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDepartmentComponent } from './ajouter-department.component';

describe('AjouterDepartmentComponent', () => {
  let component: AjouterDepartmentComponent;
  let fixture: ComponentFixture<AjouterDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterDepartmentComponent]
    });
    fixture = TestBed.createComponent(AjouterDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
