import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rapport } from '../Entities/Rapport';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-rapport',
  templateUrl: './liste-rapport.component.html',
  styleUrls: ['./liste-rapport.component.css']
})
export class ListeRapportComponent implements OnInit {
  listerapport: Rapport[] = [];
  filteredRapports: Rapport[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadRapports();
  }

  loadRapports(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getRapport().subscribe({
      next: (rapports) => {
        this.listerapport = rapports;
        this.filteredRapports = rapports;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des rapports';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRapports = this.listerapport;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredRapports = this.listerapport.filter(rapport =>
      (rapport.id?.toString().includes(searchTermLower)) ||
      (rapport.encadrant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (rapport.encadrant?.prenom?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredRapports = this.listerapport;
  }

  trackByRapportId(index: number, rapport: Rapport): number {
    return rapport.id || index;
  }

  downloadPdf(base64String: any): void {
    const fileName = "rapport";
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}

