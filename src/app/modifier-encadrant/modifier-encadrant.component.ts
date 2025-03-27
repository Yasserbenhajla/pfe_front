import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-encadrant',
  templateUrl: './modifier-encadrant.component.html',
  styleUrls: ['./modifier-encadrant.component.css']
})
export class ModifierEncadrantComponent {
  id: number;
  messageCommande = "";
  encadrantForm: FormGroup;

  constructor( private services: CrudService,private router: Router, private fb: FormBuilder, private rout: ActivatedRoute ) {
    let formControls = {
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      qualite: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    };
    this.encadrantForm = this.fb.group(formControls);
  }

  get nom() { return this.encadrantForm.get('nom'); }
  get prenom() { return this.encadrantForm.get('prenom'); }
  get email() { return this.encadrantForm.get('email'); }
  get password() { return this.encadrantForm.get('password'); }
  get qualite() { return this.encadrantForm.get('qualite'); }
  get tel() { return this.encadrantForm.get('tel'); }

  ngOnInit(): void {
    let idEncadrant = this.rout.snapshot.params['id'];
    this.id = idEncadrant;
    this.services.findEncadrantById(idEncadrant).subscribe((result) => {
      let encadrant = result;
      console.log(encadrant);
      this.encadrantForm.patchValue({
        nom: encadrant.nom,
        prenom: encadrant.prenom,
        email: encadrant.email,
        password: encadrant.password,
        qualite: encadrant.qualite,
        tel: encadrant.tel
      });
    });
  }

  updateEncadrant() {
    let data = this.encadrantForm.value;
    let encadrant = new Encadrant(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.password,
      data.qualite,
      data.tel
    );
    console.log(encadrant);
    console.log(data);
    this.services.updateEncadrant(this.id, encadrant).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/listeEncadrants']).then(() => window.location.reload());
    });
  }
}
