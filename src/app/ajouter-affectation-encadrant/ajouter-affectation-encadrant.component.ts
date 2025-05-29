import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';
import { Sujet } from '../Entities/Sujet.Entities';
import { SaveAffectation } from '../Entities/SaveAffectation';

@Component({
  selector: 'app-ajouter-affectation-encadrant',
  templateUrl: './ajouter-affectation-encadrant.component.html',
  styleUrls: ['./ajouter-affectation-encadrant.component.css']
})
export class AjouterAffectationEncadrantComponent implements OnInit {
  messageCommande = '';
  affectationForm: FormGroup;
  listeEncadrant: Encadrant[] = [];
  listeSujet: Sujet[] = [];

  // Nouvelles propriétés pour le design moderne
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      sujet: new FormControl('', [Validators.required]),
      encadrant: new FormControl('', [Validators.required]),
    };
    this.affectationForm = this.fb.group(formControls);
  }

  get sujet() {
    return this.affectationForm.get('sujet');
  }

  get encadrant() {
    return this.affectationForm.get('encadrant');
  }

  addNewAffectation() {
    if (this.affectationForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez sélectionner un encadrant et un sujet.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.messageCommande = '';

    const data = this.affectationForm.value;
    console.log('Données du formulaire:', data);
    console.log('Formulaire valide:', this.affectationForm.valid);
    console.log('Valeur encadrant:', data.encadrant);
    console.log('Valeur sujet:', data.sujet);

    // Vérifier que les valeurs ne sont pas vides
    if (!data.encadrant || !data.sujet) {
      this.errorMessage = 'Veuillez sélectionner un encadrant et un sujet.';
      this.isSubmitting = false;
      return;
    }

    const model: SaveAffectation = new SaveAffectation();
    model.id = null;
    model.idSujet = parseInt(data.sujet);
    model.idEncadrant = parseInt(data.encadrant);

    console.log('Modèle d\'affectation:', model);
    console.log('Type idSujet:', typeof model.idSujet);
    console.log('Type idEncadrant:', typeof model.idEncadrant);

    this.services.addAffectation(model).subscribe({
      next: (res) => {
        console.log('Réponse du serveur:', res);
        this.successMessage = 'Affectation créée avec succès !';
        this.isSubmitting = false;

        // Réinitialiser le formulaire
        this.affectationForm.reset();

        setTimeout(() => {
          this.router.navigate(['/listeAffectation']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'affectation:', error);

        let errorMsg = 'Erreur lors de la création de l\'affectation.';
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error.error && typeof error.error === 'string') {
          errorMsg = error.error;
        } else if (error.message) {
          errorMsg = error.message;
        } else if (error.status === 400) {
          errorMsg = 'Données invalides. Vérifiez les sélections.';
        } else if (error.status === 409) {
          errorMsg = 'Cette affectation existe déjà.';
        } else if (error.status === 500) {
          errorMsg = 'Erreur serveur. Veuillez réessayer plus tard.';
        }

        this.errorMessage = errorMsg;
        this.isSubmitting = false;
      }
    });
  }

  // Méthode pour marquer tous les champs comme touchés (pour afficher les erreurs)
  private markFormGroupTouched(): void {
    Object.keys(this.affectationForm.controls).forEach(key => {
      const control = this.affectationForm.get(key);
      control?.markAsTouched();
    });
  }

  // Méthodes pour obtenir les objets sélectionnés
  getSelectedEncadrant(): Encadrant | undefined {
    const encadrantId = this.affectationForm.get('encadrant')?.value;
    return this.listeEncadrant.find(e => e.id == encadrantId);
  }

  getSelectedSujet(): Sujet | undefined {
    const sujetId = this.affectationForm.get('sujet')?.value;
    return this.listeSujet.find(s => s.id == sujetId);
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  private loadFormData(): void {
    // Charger les encadrants
    this.services.getEncadrants().subscribe({
      next: (encadrants) => {
        this.listeEncadrant = encadrants;
        console.log('Encadrants chargés:', encadrants);
        console.log('Nombre d\'encadrants:', encadrants.length);

        if (encadrants.length === 0) {
          this.errorMessage = 'Aucun encadrant disponible. Veuillez d\'abord ajouter des encadrants.';
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des encadrants:', error);
        this.errorMessage = 'Erreur lors du chargement des encadrants. Veuillez rafraîchir la page.';
      }
    });

    // Charger les sujets
    this.services.getSujet().subscribe({
      next: (sujets) => {
        this.listeSujet = sujets;
        console.log('Sujets chargés:', sujets);
        console.log('Nombre de sujets:', sujets.length);

        if (sujets.length === 0) {
          this.errorMessage = 'Aucun sujet disponible. Veuillez d\'abord ajouter des sujets.';
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sujets:', error);
        this.errorMessage = 'Erreur lors du chargement des sujets. Veuillez rafraîchir la page.';
      }
    });
  }

}
