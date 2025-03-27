import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-encadrant',
  templateUrl: './ajouter-encadrant.component.html',
  styleUrls: ['./ajouter-encadrant.component.css']
})
export class AjouterEncadrantComponent {

  messageCommande = "";
  encadrantForm: FormGroup;

  constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      qualite: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8,15}$")])
    };
    this.encadrantForm = this.fb.group(formControls);
  }

  get nom() { return this.encadrantForm.get('nom'); }
  get prenom() { return this.encadrantForm.get('prenom'); }
  get email() { return this.encadrantForm.get('email'); }
  get password() { return this.encadrantForm.get('password'); }
  get qualite() { return this.encadrantForm.get('qualite'); }
  get tel() { return this.encadrantForm.get('tel'); }

  addNewEncadrant() {
    let data = this.encadrantForm.value;
    let encadrant = new Encadrant(
      undefined, data.nom, data.prenom, data.email, data.password, data.qualite, data.tel
    );

    if (!data.nom || !data.prenom || !data.email || !data.password || !data.qualite || !data.tel) {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
      Veuillez remplir tous les champs
    </div>`;
    } else {
      this.services.addEncadrant(encadrant).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
          Encadrant ajouté avec succès
        </div>`;
          this.router.navigate(['/listeEncadrants']).then(() => { window.location.reload(); });
        },
        err => {
          this.messageCommande = `<div class="alert alert-warning" role="alert">
          L'email existe déjà !
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
