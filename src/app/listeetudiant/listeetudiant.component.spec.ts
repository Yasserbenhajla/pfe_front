import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeetudiantComponent } from './listeetudiant.component';

describe('ListeetudiantComponent', () => {
  let component: ListeetudiantComponent;
  let fixture: ComponentFixture<ListeetudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeetudiantComponent]
    });
    fixture = TestBed.createComponent(ListeetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
