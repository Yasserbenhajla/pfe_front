import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Entities/Admin.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent implements OnInit {

  listAdmin: Admin[] = [];
  filteredAdmins: Admin[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getAdmin().subscribe({
      next: (admins) => {
        this.listAdmin = admins;
        this.filteredAdmins = admins;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des administrateurs';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAdmins = this.listAdmin;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredAdmins = this.listAdmin.filter(admin =>
      (admin.nom?.toLowerCase().includes(searchTermLower)) ||
      (admin.prenom?.toLowerCase().includes(searchTermLower)) ||
      (admin.role?.toLowerCase().includes(searchTermLower)) ||
      (admin.email?.toLowerCase().includes(searchTermLower))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredAdmins = this.listAdmin;
  }

  deleteAdmin(admin: Admin): void {
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'administrateur ${admin.prenom} ${admin.nom} ?`;

    if (confirm(confirmMessage)) {
      this.service.onDeleteAdmin(admin.id).subscribe({
        next: () => {
          // Recharger la liste au lieu de recharger toute la page
          this.loadAdmins();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression';
          console.error('Erreur:', error);
        }
      });
    }
  }

  editAdmin(adminId: number): void {
    this.router.navigate(['/modifierAdmin', adminId]);
  }

  getRoleBadgeClass(role: string): string {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return 'badge-danger';
      case 'sousadmin':
        return 'badge-warning';
      case 'commission de stage':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  }

  getRoleDisplayName(role: string): string {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return 'Super Admin';
      case 'sousadmin':
        return 'Sous Admin';
      case 'commission de stage':
        return 'Commission Stage';
      default:
        return role || 'Non défini';
    }
  }

  trackByAdminId(index: number, admin: Admin): number {
    return admin.id || index;
  }
}
