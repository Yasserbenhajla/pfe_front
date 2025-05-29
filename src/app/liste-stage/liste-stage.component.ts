import { Component, OnInit } from '@angular/core';
import { Stage } from '../Entities/Stage';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-stage',
  templateUrl: './liste-stage.component.html',
  styleUrls: ['./liste-stage.component.css']
})
export class ListeStageComponent implements OnInit {
  listStage: Stage[] = [];
  filteredStages: Stage[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getStage().subscribe({
      next: (stages) => {
        this.listStage = stages;
        this.filteredStages = stages;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des stages';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStages = this.listStage;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredStages = this.listStage.filter(stage =>
      (stage.id?.toString().includes(searchTermLower)) ||
      (stage.intitule?.toLowerCase().includes(searchTermLower)) ||
      (stage.description?.toLowerCase().includes(searchTermLower)) ||
      (stage.lieu?.toLowerCase().includes(searchTermLower)) ||
      (stage.pays?.toLowerCase().includes(searchTermLower)) ||
      (stage.technologieOutil?.toLowerCase().includes(searchTermLower)) ||
      (stage.nomEntreprise?.toLowerCase().includes(searchTermLower)) ||
      (stage.typeDeStage?.nom?.toLowerCase().includes(searchTermLower)) ||
      (stage.etudiant?.nom?.toLowerCase().includes(searchTermLower)) ||
      (stage.etudiant?.prenom?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredStages = this.listStage;
  }

  trackByStageId(index: number, stage: Stage): number {
    return stage.id || index;
  }

  getTechnologies(techString: string): string[] {
    if (!techString) return [];
    return techString.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
  }

  formatDate(dateInput: string | Date): string {
    if (!dateInput) return '';
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateInput.toString();
    }
  }
}


