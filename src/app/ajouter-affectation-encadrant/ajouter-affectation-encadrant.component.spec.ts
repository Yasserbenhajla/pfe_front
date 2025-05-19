import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAffectationEncadrantComponent } from './ajouter-affectation-encadrant.component';

describe('AjouterAffectationEncadrantComponent', () => {
  let component: AjouterAffectationEncadrantComponent;
  let fixture: ComponentFixture<AjouterAffectationEncadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterAffectationEncadrantComponent]
    });
    fixture = TestBed.createComponent(AjouterAffectationEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
