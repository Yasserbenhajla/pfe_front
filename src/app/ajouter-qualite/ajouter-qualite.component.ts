import { Component, OnInit } from '@angular/core';
import { Qualite } from '../Entities/Qualite.Entities';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-qualite',
  templateUrl: './ajouter-qualite.component.html',
  styleUrls: ['./ajouter-qualite.component.css']
})
export class AjouterQualiteComponent implements OnInit {
  qualiteForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.qualiteForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  get nom() { return this.qualiteForm.get('nom'); }

  ngOnInit(): void {}

  addNewQualite() {
    if (this.qualiteForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.qualiteForm.value;
    const qualite = new Qualite(undefined, data.nom.trim());

    this.services.addQualite(qualite).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Qualité ajoutée avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeQualite']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de l\'ajout. Cette qualité existe peut-être déjà.';
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.qualiteForm.controls).forEach(key => {
      const control = this.qualiteForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.qualiteForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}

