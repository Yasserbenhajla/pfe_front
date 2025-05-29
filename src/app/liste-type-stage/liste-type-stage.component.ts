import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { TypeStage } from '../Entities/TypeStage.Entities';

@Component({
  selector: 'app-liste-type-stage',
  templateUrl: './liste-type-stage.component.html',
  styleUrls: ['./liste-type-stage.component.css']
})
export class ListeTypeStageComponent implements OnInit {
  listTypeStage: TypeStage[] = [];
  filteredTypeStages: TypeStage[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadTypeStages();
  }

  loadTypeStages(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getTypeStage().subscribe({
      next: (typeStages) => {
        this.listTypeStage = typeStages;
        this.filteredTypeStages = typeStages;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des types de stage';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTypeStages = this.listTypeStage;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredTypeStages = this.listTypeStage.filter(typeStage =>
        typeStage.nom?.toLowerCase().includes(searchLower)
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredTypeStages = this.listTypeStage;
  }

  trackByTypeStageId(index: number, typeStage: TypeStage): number {
    return typeStage.id || index;
  }

  deleteTypeStage(id: number, nom: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le type de stage "${nom}" ?`)) {
      // TODO: Implémenter la suppression
      console.log('Suppression du type de stage:', id);
    }
  }
}
