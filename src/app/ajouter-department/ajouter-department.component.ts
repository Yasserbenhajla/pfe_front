import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Department } from '../Entities/Department';

@Component({
  selector: 'app-ajouter-department',
  templateUrl: './ajouter-department.component.html',
  styleUrls: ['./ajouter-department.component.css']
})
export class AjouterDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  get nom() {
    return this.departmentForm.get('nom');
  }

  ngOnInit(): void {}

  addNewDepartment() {
    if (this.departmentForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.departmentForm.value;
    const newDepartment = new Department(undefined, data.nom.trim());

    this.services.addDepartment(newDepartment).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Département ajouté avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeDepartment']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de l\'ajout. Ce département existe peut-être déjà.';
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.departmentForm.controls).forEach(key => {
      const control = this.departmentForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.departmentForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}


