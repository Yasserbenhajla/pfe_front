import { Component, OnInit } from '@angular/core';
import { Department } from '../Entities/Department';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-department',
  templateUrl: './liste-department.component.html',
  styleUrls: ['./liste-department.component.css']
})
export class ListeDepartmentComponent implements OnInit {
  listDepartment: Department[] = [];
  filteredDepartments: Department[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getDepartment().subscribe({
      next: (departments) => {
        this.listDepartment = departments;
        this.filteredDepartments = departments;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des départements';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDepartments = this.listDepartment;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredDepartments = this.listDepartment.filter(department =>
        department.nom?.toLowerCase().includes(searchLower)
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredDepartments = this.listDepartment;
  }

  trackByDepartmentId(index: number, department: Department): number {
    return department.id || index;
  }

  deleteDepartment(id: number, nom: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le département "${nom}" ?`)) {
      // TODO: Implémenter la suppression
      console.log('Suppression du département:', id);
    }
  }
}


