import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRapportComponent } from './liste-rapport.component';

describe('ListeRapportComponent', () => {
  let component: ListeRapportComponent;
  let fixture: ComponentFixture<ListeRapportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRapportComponent]
    });
    fixture = TestBed.createComponent(ListeRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
