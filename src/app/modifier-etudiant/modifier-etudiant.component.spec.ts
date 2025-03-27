import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEtudiantComponent } from './modifier-etudiant.component';

describe('ModifierEtudiantComponent', () => {
  let component: ModifierEtudiantComponent;
  let fixture: ComponentFixture<ModifierEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierEtudiantComponent]
    });
    fixture = TestBed.createComponent(ModifierEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
