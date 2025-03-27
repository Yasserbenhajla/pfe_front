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

  addNewEtudiant() {
    let data = this.etudiantForm.value;
    let etudiant = new Etudiant(
      undefined, data.nom, data.prenom, data.email, data.password, data.niveau, data.tel
    );

    if (!data.nom || !data.prenom || !data.email || !data.password || !data.niveau || !data.tel) {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
      Veuillez remplir tous les champs
    </div>`;
    } else {
      this.services.addetudiant(etudiant).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
          Étudiant ajouté avec succès
        </div>`;
          this.router.navigate(['/listeEtudiants']).then(() => { window.location.reload(); });
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
