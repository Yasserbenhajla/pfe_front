import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';
import { Sujet } from '../Entities/Sujet.Entities';
import { SaveAffectation } from '../Entities/SaveAffectation';

@Component({
  selector: 'app-ajouter-affectation-encadrant',
  templateUrl: './ajouter-affectation-encadrant.component.html',
  styleUrls: ['./ajouter-affectation-encadrant.component.css']
})
export class AjouterAffectationEncadrantComponent {
  messageCommande = '';
  imgURL: any;
  affectationForm: FormGroup;
  userFile: any;
  public imagePath: any;
  listeEncadrant: Encadrant[];
  listeSujet: Sujet[];


  public message!: string;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      sujet: new FormControl('', [Validators.required, Validators.minLength(4)]),

      encadrant: new FormControl('', [Validators.required]),

    };
    this.affectationForm = this.fb.group(formControls);
  }

  get sujet() {
    return this.affectationForm.get('sujet');
  }

  get encadrant() {
    return this.affectationForm.get('encadrant');
  }

  addNewAffectation() {
    let data = this.affectationForm.value;
    let datas = this.services.userDetails();
    console.log(data);
    let model: SaveAffectation = new SaveAffectation();
    console.log(model);
    model.id = null;
    model.idSujet = data.sujet;
    model.idEncadrant= data.encadrant;

    if (
      data.sujet == 0 ||

      data.encadrant == 0

    ) {
      this.messageCommande = `<div class="alert
      alert-danger" role="alert">
      remplir votre champ
    </div>`;
    } else {
      this.services.addAffectation(model).subscribe(
        (res) => {
          console.log(res);

          this.router.navigate(['/listesujet']);
        },
        (err) => {}
      );
      setTimeout(() => {
        this.messageCommande = '';
      }, 3000);
    }
  }

  ngOnInit(): void {
    this.services.getEncadrants().subscribe((encadrant) => {
      this.listeEncadrant = encadrant;
      console.log(encadrant);
    });
    this.services.getSujet().subscribe((sujet) => {
      this.listeSujet = sujet;
      console.log(sujet);
    });
  }

}
