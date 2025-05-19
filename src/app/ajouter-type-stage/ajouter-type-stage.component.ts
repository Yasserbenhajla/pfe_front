import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { TypeStage } from '../Entities/TypeStage.Entities';

@Component({
  selector: 'app-ajouter-type-stage',
  templateUrl: './ajouter-type-stage.component.html',
  styleUrls: ['./ajouter-type-stage.component.css']
})
export class AjouterTypeStageComponent implements OnInit {
  messageCommande = "";
  typeStageForm!: FormGroup;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.typeStageForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get nom() {
    return this.typeStageForm.get('nom');
  }

  addNewTypeStage() {
    const data = this.typeStageForm.value;
    const newTypeStage = new TypeStage(undefined, data.nom);
    console.log(newTypeStage);

    if (!data.nom) {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez remplir le champ nom
      </div>`;
    } else {
      this.services.addTypeStage(newTypeStage).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Type de stage ajouté avec succès
          </div>`;
          setTimeout(() => {
            this.router.navigate(['/listeTypeStage']);
          }, 2000);
        },
        err => {
          this.messageCommande = `<div class="alert alert-warning" role="alert">
            Erreur lors de l'ajout !
          </div>`;
        }
      );

      setTimeout(() => {
        this.messageCommande = "";
      }, 3000);
    }
  }
}
