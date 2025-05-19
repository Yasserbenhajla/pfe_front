import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQualiteComponent } from './liste-qualite.component';

describe('ListeQualiteComponent', () => {
  let component: ListeQualiteComponent;
  let fixture: ComponentFixture<ListeQualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeQualiteComponent]
    });
    fixture = TestBed.createComponent(ListeQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
