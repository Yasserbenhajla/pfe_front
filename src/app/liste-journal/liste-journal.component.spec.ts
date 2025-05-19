import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeJournalComponent } from './liste-journal.component';

describe('ListeJournalComponent', () => {
  let component: ListeJournalComponent;
  let fixture: ComponentFixture<ListeJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeJournalComponent]
    });
    fixture = TestBed.createComponent(ListeJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
