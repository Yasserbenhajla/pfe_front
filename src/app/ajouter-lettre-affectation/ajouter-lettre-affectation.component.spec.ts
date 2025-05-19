import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLettreAffectationComponent } from './ajouter-lettre-affectation.component';

describe('AjouterLettreAffectationComponent', () => {
  let component: AjouterLettreAffectationComponent;
  let fixture: ComponentFixture<AjouterLettreAffectationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterLettreAffectationComponent]
    });
    fixture = TestBed.createComponent(AjouterLettreAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
