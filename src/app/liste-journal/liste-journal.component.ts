import { Component, OnInit } from '@angular/core';
import { Journal } from '../Entities/Journal.Entities';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-journal',
  templateUrl: './liste-journal.component.html',
  styleUrls: ['./liste-journal.component.css']
})
export class ListeJournalComponent implements OnInit {
  listJournal: Journal[] = [];
  filteredJournals: Journal[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadJournals();
  }

  loadJournals(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getJournal().subscribe({
      next: (journals) => {
        this.listJournal = journals;
        this.filteredJournals = journals;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des journaux';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredJournals = this.listJournal;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredJournals = this.listJournal.filter(journal =>
      (journal.id?.toString().includes(searchTermLower)) ||
      (journal.etudiant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (journal.etudiant?.prenom?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredJournals = this.listJournal;
  }

  trackByJournalId(index: number, journal: Journal): number {
    return journal.id || index;
  }

  downloadPdf(base64String: any): void {
    const fileName = "journal";
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}

