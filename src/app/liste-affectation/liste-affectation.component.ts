import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from '../Entities/Affectation';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-affectation',
  templateUrl: './liste-affectation.component.html',
  styleUrls: ['./liste-affectation.component.css']
})
export class ListeAffectationComponent implements OnInit {

  listAffectation: Affectation[] = [];
  filteredAffectations: Affectation[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadAffectations();
  }

  loadAffectations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getAffectation().subscribe({
      next: (affectations) => {
        this.listAffectation = affectations;
        this.filteredAffectations = affectations;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des affectations';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAffectations = this.listAffectation;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredAffectations = this.listAffectation.filter(affectation =>
      (affectation.encadrant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (affectation.encadrant?.prenom?.toLowerCase().includes(searchTermLower)) ||
      (affectation.encadrant?.tel?.toLowerCase().includes(searchTermLower)) ||
      (affectation.sujet?.etudiant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (affectation.sujet?.etudiant?.prenom?.toLowerCase().includes(searchTermLower)) ||
      (affectation.sujet?.etudiant?.email?.toLowerCase().includes(searchTermLower)) ||
      (affectation.sujet?.etudiant?.niveau?.toLowerCase().includes(searchTermLower)) ||
      (affectation.sujet?.description?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredAffectations = this.listAffectation;
  }

  trackByAffectationId(index: number, affectation: Affectation): number {
    return affectation.id || index;
  }
}



