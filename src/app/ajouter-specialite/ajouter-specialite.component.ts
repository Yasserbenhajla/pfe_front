import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Specialite } from '../Entities/Specialite.Entities';

@Component({
  selector: 'app-ajouter-specialite',
  templateUrl: './ajouter-specialite.component.html',
  styleUrls: ['./ajouter-specialite.component.css']
})
export class AjouterSpecialiteComponent implements OnInit {
  specialiteForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.specialiteForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  get nom() { return this.specialiteForm.get('nom'); }

  ngOnInit(): void {}

  addNewSpecialite() {
    if (this.specialiteForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.specialiteForm.value;
    const specialite = new Specialite(undefined, data.nom.trim());

    this.services.addspecialte(specialite).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Spécialité ajoutée avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeSpecialite']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de l\'ajout. Cette spécialité existe peut-être déjà.';
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.specialiteForm.controls).forEach(key => {
      const control = this.specialiteForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.specialiteForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}

