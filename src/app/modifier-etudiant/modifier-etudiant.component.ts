import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-etudiant',
  templateUrl: './modifier-etudiant.component.html',
  styleUrls: ['./modifier-etudiant.component.css']
})
export class ModifierEtudiantComponent {
  id: number;
  messageCommande = "";
  etudiantForm: FormGroup;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {
    let formControls = {
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    };
    this.etudiantForm = this.fb.group(formControls);
  }

  get nom() { return this.etudiantForm.get('nom'); }
  get prenom() { return this.etudiantForm.get('prenom'); }
  get email() { return this.etudiantForm.get('email'); }
  get password() { return this.etudiantForm.get('password'); }
  get niveau() { return this.etudiantForm.get('niveau'); }
  get tel() { return this.etudiantForm.get('tel'); }

  ngOnInit(): void {
    let idEvent = this.rout.snapshot.params['id'];
    this.id = idEvent;
    this.services.findEtudiantById(idEvent).subscribe((result) => {
      let etudiant = result;
      console.log(etudiant);
      this.etudiantForm.patchValue({
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        email: etudiant.email,
        password: etudiant.password,
        niveau: etudiant.niveau,
        tel: etudiant.tel
      });
    });
  }

  updateEtudiant() {
    let data = this.etudiantForm.value;
    let etudiant = new Etudiant(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.niveau,
      data.tel
    );
    console.log(etudiant);
    console.log(data);
    this.services.updateEtudiant(this.id, etudiant).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/listeEtudiant']).then(() => window.location.reload());
    });
  }
}


