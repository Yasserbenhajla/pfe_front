import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterQualiteComponent } from './ajouter-qualite.component';

describe('AjouterQualiteComponent', () => {
  let component: AjouterQualiteComponent;
  let fixture: ComponentFixture<AjouterQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterQualiteComponent]
    });
    fixture = TestBed.createComponent(AjouterQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
