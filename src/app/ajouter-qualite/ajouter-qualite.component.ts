import { Component } from '@angular/core';
import { Qualite } from '../Entities/Qualite.Entities';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-qualite',
  templateUrl: './ajouter-qualite.component.html',
  styleUrls: ['./ajouter-qualite.component.css']
})
export class AjouterQualiteComponent {
  messageCommande = "";
  qualiteForm: FormGroup;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.qualiteForm = this.fb.group({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get nom() { return this.qualiteForm.get('nom'); }

  addNewQualite() {
    let data = this.qualiteForm.value;
    let qualite = new Qualite(undefined, data.nom);
    console.log(qualite);

    if (!data.nom || data.nom.trim() === "") {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez remplir le champ nom.
      </div>`;
    } else {
      this.services.addQualite(qualite).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Qualité ajoutée avec succès.
          </div>`;
          this.router.navigate(['/listeQualite']).then(() => window.location.reload());
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

