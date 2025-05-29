import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { TypeStage } from '../Entities/TypeStage.Entities';

@Component({
  selector: 'app-ajouter-type-stage',
  templateUrl: './ajouter-type-stage.component.html',
  styleUrls: ['./ajouter-type-stage.component.css']
})
export class AjouterTypeStageComponent implements OnInit {
  typeStageForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.typeStageForm = this.fb.group({
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  get nom() {
    return this.typeStageForm.get('nom');
  }

  ngOnInit(): void {}

  addNewTypeStage() {
    if (this.typeStageForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.typeStageForm.value;
    const newTypeStage = new TypeStage(undefined, data.nom.trim());

    this.services.addTypeStage(newTypeStage).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Type de stage ajouté avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeTypeStage']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de l\'ajout. Ce type de stage existe peut-être déjà.';
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.typeStageForm.controls).forEach(key => {
      const control = this.typeStageForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.typeStageForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
