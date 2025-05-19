import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Qualite } from '../Entities/Qualite.Entities';
import { CrudService } from '../service/crud.service';
import { Department } from '../Entities/Department';

@Component({
  selector: 'app-ajouter-department',
  templateUrl: './ajouter-department.component.html',
  styleUrls: ['./ajouter-department.component.css']
})
export class AjouterDepartmentComponent {
   messageCommande = "";
    departmentForm: FormGroup;

    constructor(
      private services: CrudService,
      private router: Router,
      private fb: FormBuilder
    ) {
      this.departmentForm = this.fb.group({
        nom: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
    }

    get nom() { return this.departmentForm.get('nom'); }

    addNewDepartment() {
      let data = this.departmentForm.value;
      let department = new Department(undefined, data.nom);
      console.log(department);

      if (!data.nom || data.nom.trim() === "") {
        this.messageCommande = `<div class="alert alert-danger" role="alert">
          Veuillez remplir le champ nom.
        </div>`;
      } else {
        this.services.addDepartment(department).subscribe(
          res => {
            console.log(res);
            this.messageCommande = `<div class="alert alert-success" role="alert">
              Department ajoutée avec succès.
            </div>`;
            this.router.navigate(['/listeDepartment']).then(() => window.location.reload());
          },
          err => {
            console.error(err);
            this.messageCommande = `<div class="alert alert-warning" role="alert">
              Une erreur est survenue.
            </div>`;
          }
        );

        setTimeout(() => {
          this.messageCommande = "";
        }, 3000);
      }
    }

    ngOnInit(): void {}
  }


