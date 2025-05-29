import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listeetudiant',
  templateUrl: './listeetudiant.component.html',
  styleUrls: ['./listeetudiant.component.css']
})
export class ListeetudiantComponent {

  listEtudiant: Etudiant[] = [];
  filteredEtudiants: Etudiant[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getEtudiant().subscribe({
      next: (etudiants) => {
        this.listEtudiant = etudiants;
        this.filteredEtudiants = etudiants;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des étudiants';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEtudiants = this.listEtudiant;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    this.filteredEtudiants = this.listEtudiant.filter(etudiant =>
      etudiant.nom?.toLowerCase().includes(searchLower) ||
      etudiant.prenom?.toLowerCase().includes(searchLower) ||
      etudiant.email?.toLowerCase().includes(searchLower) ||
      etudiant.niveau?.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredEtudiants = this.listEtudiant;
  }

  trackByEtudiantId(index: number, etudiant: Etudiant): number {
    return etudiant.id || index;
  }

  editEtudiant(id: number): void {
    this.router.navigate(['/modifierEtudiant', id]);
  }

  DeleteEtudiant(etudiant: Etudiant): void {
    if (confirm("Voulez-vous supprimer cet étudiant avec l'ID " + etudiant.id + " ?")) {
      this.service.onDeleteEtudiant(etudiant.id).subscribe({
        next: () => {
          this.listEtudiant = this.listEtudiant.filter(e => e.id !== etudiant.id);
          this.onSearchChange(); // Refresh filtered list
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'étudiant';
          console.error('Erreur:', error);
        }
      });
    }
  }
}
