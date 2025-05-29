import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../Entities/Admin.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-admin',
  templateUrl: './ajouter-admin.component.html',
  styleUrls: ['./ajouter-admin.component.css']
})
export class AjouterAdminComponent {

  messageCommande = ""
  adminForm: FormGroup
  successMessage: string = ''
  errorMessage: string = ''
  showPassword: boolean = false
  isSubmitting: boolean = false

  constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,
      Validators.minLength(4)]),
        prenom: new FormControl('',[
          Validators.required,]),

      email: new FormControl('',[
        Validators.required,
      Validators.email]),
      password: new FormControl('',[
        Validators.required,]),
     role: new FormControl('',[
          Validators.required,])}
     this.adminForm = this.fb.group(formControls)
   }
   get nom() {return this.adminForm.get('nom');}
   get prenom() {return this.adminForm.get('prenom');}
  get email() { return this.adminForm.get('email');}
  get password() {return this.adminForm.get('password');}
  get role() {return this.adminForm.get('role');}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  addNewAdmin(): void {
    if (this.adminForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez remplir tous les champs requis correctement.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.adminForm.value;
    const admin = new Admin(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.role
    );

    this.services.addadmin(admin).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Administrateur ajouté avec succès !';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/listeAdmin']);
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
    Object.keys(this.adminForm.controls).forEach(key => {
      const control = this.adminForm.get(key);
      control?.markAsTouched();
    });
  }



  ngOnInit(): void {
  }
}


