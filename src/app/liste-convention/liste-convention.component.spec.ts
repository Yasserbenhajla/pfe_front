import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConventionComponent } from './liste-convention.component';

describe('ListeConventionComponent', () => {
  let component: ListeConventionComponent;
  let fixture: ComponentFixture<ListeConventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeConventionComponent]
    });
    fixture = TestBed.createComponent(ListeConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
