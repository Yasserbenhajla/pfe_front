import { LettreAffectation } from './../Entities/LettreAffectation';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveDemandeStage } from '../Entities/SaveDemandeStage';
import { CrudService } from '../service/crud.service';
import { SaveLettreAffectation } from '../Entities/SaveLettreAffectation';

@Component({
  selector: 'app-ajouter-lettre-affectation',
  templateUrl: './ajouter-lettre-affectation.component.html',
  styleUrls: ['./ajouter-lettre-affectation.component.css']
})
export class AjouterLettreAffectationComponent {
  messageCommande = '';
    imgURL: any;
    lettreAffectationForm: FormGroup;
    userFile: any;
    public imagePath: any;


    public message!: string;

    constructor(
      private services: CrudService,
      private router: Router,
      private fb: FormBuilder
    ) {
      let formControls = {
        lettreAffectation: new FormControl('', [Validators.required, Validators.minLength(4)]),



      };
      this.lettreAffectationForm = this.fb.group(formControls);
    }

    get lettreAffectation() {
      return this.lettreAffectationForm.get('lettreAffectation');
    }



    addNewLettreAffectation() {
      let data = this.lettreAffectationForm.value;
      let datas= this.services.userDetails();
      console.log(data);
      let model: SaveLettreAffectation = new SaveLettreAffectation();
      console.log(model);
      model.id = null;
      model.lettreAffectation=this.imgURL;


      if (
        data.lettreAffectation == 0



      ) {
        this.messageCommande = `<div class="alert
        alert-danger" role="alert">
        remplir votre champ
      </div>`;
      } else {
        this.services.addLettreAffectation(model).subscribe(
          (res) => {
            console.log(res);

            this.router.navigate(['/listeLettreAffectation']);
          },
          (err) => {}
        );
        setTimeout(() => {
          this.messageCommande = '';
        }, 3000);
      }
    }


    OnSelectFile(event:any){
      if(event.target.files.length>0){
        const file=event.target.files[0];
        this.userFile=file;
        var mimeType=event.target.files[0].type;
        var reader=new FileReader();
        this.imagePath=file;
        reader.readAsDataURL(file)
        reader.onload=(_event)=>{
          this.imgURL=reader.result;
          console.log(this.imgURL)
        };
      }

    }

}
