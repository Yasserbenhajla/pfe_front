import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from '../Entities/Specialite.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-specialite',
  templateUrl: './list-specialite.component.html',
  styleUrls: ['./list-specialite.component.css']
})
export class ListSpecialiteComponent implements OnInit {
  listSpecialite: Specialite[] = [];
  filteredSpecialites: Specialite[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadSpecialites();
  }

  loadSpecialites(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getSpecialite().subscribe({
      next: (specialites) => {
        this.listSpecialite = specialites;
        this.filteredSpecialites = specialites;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des spécialités';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSpecialites = this.listSpecialite;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredSpecialites = this.listSpecialite.filter(specialite =>
        specialite.nom?.toLowerCase().includes(searchLower)
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredSpecialites = this.listSpecialite;
  }

  trackBySpecialiteId(index: number, specialite: Specialite): number {
    return specialite.id || index;
  }

  deleteSpecialite(id: number, nom: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la spécialité "${nom}" ?`)) {
      // TODO: Implémenter la suppression
      console.log('Suppression de la spécialité:', id);
    }
  }
}
