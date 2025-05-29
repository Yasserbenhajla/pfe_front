import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rapport } from '../Entities/Rapport';
import { CrudService } from '../service/crud.service';
import { ConfirmationDemande } from '../Entities/ConfirmationDemande';

@Component({
  selector: 'app-liste-confirmation-stage',
  templateUrl: './liste-confirmation-stage.component.html',
  styleUrls: ['./liste-confirmation-stage.component.css']
})
export class ListeConfirmationStageComponent implements OnInit {
  listerConfirmation: ConfirmationDemande[] = [];
  filteredConfirmations: ConfirmationDemande[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadConfirmations();
  }

  loadConfirmations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getConfirmation().subscribe({
      next: (confirmations) => {
        this.listerConfirmation = confirmations;
        this.filteredConfirmations = confirmations;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des confirmations';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredConfirmations = this.listerConfirmation;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredConfirmations = this.listerConfirmation.filter(confirmation =>
      (confirmation.id?.toString().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredConfirmations = this.listerConfirmation;
  }

  trackByConfirmationId(index: number, confirmation: ConfirmationDemande): number {
    return confirmation.id || index;
  }

  downloadPdf(base64String: any): void {
    const fileName = "confirmation";
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}

