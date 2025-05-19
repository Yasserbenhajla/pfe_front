import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypeStageComponent } from './liste-type-stage.component';

describe('ListeTypeStageComponent', () => {
  let component: ListeTypeStageComponent;
  let fixture: ComponentFixture<ListeTypeStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTypeStageComponent]
    });
    fixture = TestBed.createComponent(ListeTypeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
