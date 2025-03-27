import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEncadrantComponent } from './ajouter-encadrant.component';

describe('AjouterEncadrantComponent', () => {
  let component: AjouterEncadrantComponent;
  let fixture: ComponentFixture<AjouterEncadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterEncadrantComponent]
    });
    fixture = TestBed.createComponent(AjouterEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
