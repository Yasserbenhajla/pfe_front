import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEncadrantComponent } from './liste-encadrant.component';

describe('ListeEncadrantComponent', () => {
  let component: ListeEncadrantComponent;
  let fixture: ComponentFixture<ListeEncadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEncadrantComponent]
    });
    fixture = TestBed.createComponent(ListeEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
