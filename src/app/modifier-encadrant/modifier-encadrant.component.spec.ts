import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEncadrantComponent } from './modifier-encadrant.component';

describe('ModifierEncadrantComponent', () => {
  let component: ModifierEncadrantComponent;
  let fixture: ComponentFixture<ModifierEncadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierEncadrantComponent]
    });
    fixture = TestBed.createComponent(ModifierEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
