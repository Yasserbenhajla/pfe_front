import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRapportFinalComponent } from './liste-rapport-final.component';

describe('ListeRapportFinalComponent', () => {
  let component: ListeRapportFinalComponent;
  let fixture: ComponentFixture<ListeRapportFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRapportFinalComponent]
    });
    fixture = TestBed.createComponent(ListeRapportFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
