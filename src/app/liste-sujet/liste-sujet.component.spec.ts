import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSujetComponent } from './liste-sujet.component';

describe('ListeSujetComponent', () => {
  let component: ListeSujetComponent;
  let fixture: ComponentFixture<ListeSujetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSujetComponent]
    });
    fixture = TestBed.createComponent(ListeSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
