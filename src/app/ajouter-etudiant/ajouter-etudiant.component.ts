import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-etudiant',
  templateUrl: './ajouter-etudiant.component.html',
  styleUrls: ['./ajouter-etudiant.component.css']
})
export class AjouterEtudiantComponent {

  messageCommande = "";
  etudiantForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  isSubmitting: boolean = false;

  constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8,15}$")])
    };
    this.etudiantForm = this.fb.group(formControls);
  }

  get nom() { return this.etudiantForm.get('nom'); }
  get prenom() { return this.etudiantForm.get('prenom'); }
  get email() { return this.etudiantForm.get('email'); }
  get password() { return this.etudiantForm.get('password'); }
  get niveau() { return this.etudiantForm.get('niveau'); }
  get tel() { return this.etudiantForm.get('tel'); }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  addNewEtudiant(): void {
    if (this.etudiantForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez remplir tous les champs requis correctement.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.etudiantForm.value;
    const etudiant = new Etudiant(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.niveau,
      data.tel
    );

    this.services.addetudiant(etudiant).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Étudiant ajouté avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeEtudiant']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de l\'ajout. L\'email existe peut-être déjà.';
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.etudiantForm.controls).forEach(key => {
      const control = this.etudiantForm.get(key);
      control?.markAsTouched();
    });
  }

  ngOnInit(): void {}
}
