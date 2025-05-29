import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';
import { Qualite } from '../Entities/Qualite.Entities';
import { Specialite } from '../Entities/Specialite.Entities';

@Component({
  selector: 'app-ajouter-encadrant',
  templateUrl: './ajouter-encadrant.component.html',
  styleUrls: ['./ajouter-encadrant.component.css']
})
export class AjouterEncadrantComponent implements OnInit {

  messageCommande = "";
  encadrantForm: FormGroup;
  listeQualite: Qualite[] = [];
  listeSpecialite: Specialite[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  isSubmitting: boolean = false;

  constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      qualite: new FormControl('', [Validators.required]),
      specialite: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8,15}$")])
    };
    this.encadrantForm = this.fb.group(formControls);
  }



  addNewEncadrant(): void {
    if (this.encadrantForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez remplir tous les champs requis correctement.';
      return;
    }

    // Valider que les données nécessaires sont chargées
    if (!this.validateFormData()) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.encadrantForm.value;

    // Trouver les objets Qualite et Specialite complets basés sur les IDs sélectionnés
    const selectedQualite = this.listeQualite.find(q => q.id == data.qualite);
    const selectedSpecialite = this.listeSpecialite.find(s => s.id == data.specialite);

    // Créer un objet Encadrant en utilisant l'entité
    const encadrant = new Encadrant(
      undefined, // id sera généré par le serveur
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.tel,
      selectedQualite,
      selectedSpecialite,
      true // etat par défaut à true (actif)
    );

    // Debug: Afficher l'objet encadrant avant envoi
    console.log('Objet Encadrant à envoyer:', encadrant);
    console.log('Données du formulaire:', data);
    console.log('Qualité sélectionnée:', selectedQualite);
    console.log('Spécialité sélectionnée:', selectedSpecialite);

    this.services.addEncadrant(encadrant).subscribe({
      next: (res) => {
        console.log('Réponse du serveur:', res);
        this.successMessage = 'Encadrant ajouté avec succès !';
        this.isSubmitting = false;

        // Réinitialiser le formulaire
        this.encadrantForm.reset();

        setTimeout(() => {
          this.router.navigate(['/listeEncadrant']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur complète:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error body:', error.error);

        // Afficher le message d'erreur exact du serveur
        let errorMsg = 'Erreur lors de l\'ajout de l\'encadrant.';
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error.error && typeof error.error === 'string') {
          errorMsg = error.error;
        } else if (error.message) {
          errorMsg = error.message;
        } else if (error.status === 400) {
          errorMsg = 'Données invalides. Vérifiez les informations saisies.';
        } else if (error.status === 409) {
          errorMsg = 'Un encadrant avec cet email existe déjà.';
        } else if (error.status === 500) {
          errorMsg = 'Erreur serveur. Veuillez réessayer plus tard.';
        }

        this.errorMessage = errorMsg;
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.encadrantForm.controls).forEach(key => {
      const control = this.encadrantForm.get(key);
      control?.markAsTouched();
    });
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  private loadFormData(): void {
    // Charger les qualités
    this.services.getQualite().subscribe({
      next: (qualites) => {
        this.listeQualite = qualites;
        console.log('Qualités chargées:', qualites);

        // Vérifier si des qualités sont disponibles
        if (qualites.length === 0) {
          this.errorMessage = 'Aucune qualité disponible. Veuillez d\'abord ajouter des qualités.';
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des qualités:', error);
        this.errorMessage = 'Erreur lors du chargement des qualités. Veuillez rafraîchir la page.';
      }
    });

    // Charger les spécialités
    this.services.getSpecialite().subscribe({
      next: (specialites) => {
        this.listeSpecialite = specialites;
        console.log('Spécialités chargées:', specialites);

        // Vérifier si des spécialités sont disponibles
        if (specialites.length === 0) {
          this.errorMessage = 'Aucune spécialité disponible. Veuillez d\'abord ajouter des spécialités.';
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des spécialités:', error);
        this.errorMessage = 'Erreur lors du chargement des spécialités. Veuillez rafraîchir la page.';
      }
    });
  }

  // Méthode pour valider que les données nécessaires sont chargées
  private validateFormData(): boolean {
    if (this.listeQualite.length === 0) {
      this.errorMessage = 'Aucune qualité disponible. Impossible d\'ajouter un encadrant.';
      return false;
    }

    if (this.listeSpecialite.length === 0) {
      this.errorMessage = 'Aucune spécialité disponible. Impossible d\'ajouter un encadrant.';
      return false;
    }

    return true;
  }

  // Méthode pour basculer la visibilité du mot de passe
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Getters pour accéder facilement aux contrôles du formulaire
  get nom() { return this.encadrantForm.get('nom'); }
  get prenom() { return this.encadrantForm.get('prenom'); }
  get email() { return this.encadrantForm.get('email'); }
  get password() { return this.encadrantForm.get('password'); }
  get tel() { return this.encadrantForm.get('tel'); }
  get qualite() { return this.encadrantForm.get('qualite'); }
  get specialite() { return this.encadrantForm.get('specialite'); }
}
