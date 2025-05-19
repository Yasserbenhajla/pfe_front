import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Specialite } from '../Entities/Specialite.Entities';

@Component({
  selector: 'app-ajouter-specialite',
  templateUrl: './ajouter-specialite.component.html',
  styleUrls: ['./ajouter-specialite.component.css']
})
export class AjouterSpecialiteComponent {
  messageCommande = "";
  specialiteForm: FormGroup;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.specialiteForm = this.fb.group({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get nom() { return this.specialiteForm.get('nom'); }

  addNewSpecialite() {
    let data = this.specialiteForm.value;
    let specialite = new Specialite(undefined, data.nom);
    console.log(specialite);

    if (!data.nom || data.nom.trim() === "") {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez remplir le champ nom.
      </div>`;
    } else {
      this.services.addspecialte(specialite).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Spécialité ajoutée avec succès.
          </div>`;
          this.router.navigate(['/listeSpecialite']).then(() => window.location.reload());
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

