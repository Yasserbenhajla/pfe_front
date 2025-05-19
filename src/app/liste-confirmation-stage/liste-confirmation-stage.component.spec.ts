import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConfirmationStageComponent } from './liste-confirmation-stage.component';

describe('ListeConfirmationStageComponent', () => {
  let component: ListeConfirmationStageComponent;
  let fixture: ComponentFixture<ListeConfirmationStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeConfirmationStageComponent]
    });
    fixture = TestBed.createComponent(ListeConfirmationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
