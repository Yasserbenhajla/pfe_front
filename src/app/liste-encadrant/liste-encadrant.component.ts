import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-encadrant',
  templateUrl: './liste-encadrant.component.html',
  styleUrls: ['./liste-encadrant.component.css']
})
export class ListeEncadrantComponent {

  listEncadrant: Encadrant[] = [];
  filteredEncadrants: Encadrant[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadEncadrants();
  }

  loadEncadrants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getEncadrants().subscribe({
      next: (encadrants) => {
        this.listEncadrant = encadrants;
        this.filteredEncadrants = encadrants;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des encadrants';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEncadrants = this.listEncadrant;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    this.filteredEncadrants = this.listEncadrant.filter(encadrant =>
      encadrant.nom?.toLowerCase().includes(searchLower) ||
      encadrant.prenom?.toLowerCase().includes(searchLower) ||
      encadrant.email?.toLowerCase().includes(searchLower) ||
      encadrant.qualite?.nom?.toLowerCase().includes(searchLower) ||
      encadrant.specialite?.nom?.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredEncadrants = this.listEncadrant;
  }

  trackByEncadrantId(index: number, encadrant: Encadrant): number {
    return encadrant.id || index;
  }

  editEncadrant(id: number): void {
    this.router.navigate(['/modifierEncadrant', id]);
  }

  DeleteEncadrant(encadrant: Encadrant): void {
    if (confirm("Voulez-vous supprimer cet encadrant avec l'ID " + encadrant.id + " ?")) {
      this.service.onDeleteEncadrant(encadrant.id).subscribe({
        next: () => {
          this.listEncadrant = this.listEncadrant.filter(e => e.id !== encadrant.id);
          this.onSearchChange(); // Refresh filtered list
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'encadrant';
          console.error('Erreur:', error);
        }
      });
    }
  }
}
