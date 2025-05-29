import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Qualite } from '../Entities/Qualite.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-qualite',
  templateUrl: './liste-qualite.component.html',
  styleUrls: ['./liste-qualite.component.css']
})
export class ListeQualiteComponent implements OnInit {
  listQualite: Qualite[] = [];
  filteredQualites: Qualite[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadQualites();
  }

  loadQualites(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getQualite().subscribe({
      next: (qualites) => {
        this.listQualite = qualites;
        this.filteredQualites = qualites;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des qualités';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredQualites = this.listQualite;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredQualites = this.listQualite.filter(qualite =>
        qualite.nom?.toLowerCase().includes(searchLower)
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredQualites = this.listQualite;
  }

  trackByQualiteId(index: number, qualite: Qualite): number {
    return qualite.id || index;
  }

  deleteQualite(id: number, nom: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la qualité "${nom}" ?`)) {
      // TODO: Implémenter la suppression
      console.log('Suppression de la qualité:', id);
    }
  }
}
