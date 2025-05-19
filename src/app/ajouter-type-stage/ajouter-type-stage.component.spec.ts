import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTypeStageComponent } from './ajouter-type-stage.component';

describe('AjouterTypeStageComponent', () => {
  let component: AjouterTypeStageComponent;
  let fixture: ComponentFixture<AjouterTypeStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterTypeStageComponent]
    });
    fixture = TestBed.createComponent(AjouterTypeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
