import { Component, OnInit } from '@angular/core';
import { RapportFinal } from '../Entities/RapportFinal';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-rapport-final',
  templateUrl: './liste-rapport-final.component.html',
  styleUrls: ['./liste-rapport-final.component.css']
})
export class ListeRapportFinalComponent implements OnInit {
  listeRapportFinal: RapportFinal[] = [];
  filteredRapportsFinal: RapportFinal[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadRapportsFinal();
  }

  loadRapportsFinal(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getRapportFinal().subscribe({
      next: (rapportsFinal) => {
        this.listeRapportFinal = rapportsFinal;
        this.filteredRapportsFinal = rapportsFinal;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des rapports finaux';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRapportsFinal = this.listeRapportFinal;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredRapportsFinal = this.listeRapportFinal.filter(rapportFinal =>
      (rapportFinal.id?.toString().includes(searchTermLower)) ||
      (rapportFinal.etudiant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (rapportFinal.etudiant?.prenom?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredRapportsFinal = this.listeRapportFinal;
  }

  trackByRapportFinalId(index: number, rapportFinal: RapportFinal): number {
    return rapportFinal.id || index;
  }

  downloadPdf(base64String: any): void {
    const fileName = "RapportFinal";
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  download1Pdf(base64String: any): void {
    const fileName = "autorisation";
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}





