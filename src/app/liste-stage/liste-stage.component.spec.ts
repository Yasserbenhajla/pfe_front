import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStageComponent } from './liste-stage.component';

describe('ListeStageComponent', () => {
  let component: ListeStageComponent;
  let fixture: ComponentFixture<ListeStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeStageComponent]
    });
    fixture = TestBed.createComponent(ListeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
