import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAffectationComponent } from './liste-affectation.component';

describe('ListeAffectationComponent', () => {
  let component: ListeAffectationComponent;
  let fixture: ComponentFixture<ListeAffectationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAffectationComponent]
    });
    fixture = TestBed.createComponent(ListeAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
