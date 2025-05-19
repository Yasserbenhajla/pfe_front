import { DemandeStage } from './../Entities/DemandeStage';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveRapport } from '../Entities/SaveRapport';
import { CrudService } from '../service/crud.service';
import { SaveDemandeStage } from '../Entities/SaveDemandeStage';

@Component({
  selector: 'app-demande-stage',
  templateUrl: './demande-stage.component.html',
  styleUrls: ['./demande-stage.component.css']
})
export class DemandeStageComponent {
  messageCommande = '';
  imgURL: any;
  DemandeForm: FormGroup;
  userFile: any;
  public imagePath: any;


  public message!: string;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      demande: new FormControl('', [Validators.required, Validators.minLength(4)]),



    };
    this.DemandeForm = this.fb.group(formControls);
  }

  get DemandeStage() {
    return this.DemandeForm.get('demande');
  }



  addNewDemande() {
    let data = this.DemandeForm.value;
    let datas = this.services.userDetails();
    console.log(data);
    let model: SaveDemandeStage = new SaveDemandeStage();
    console.log(model);
    model.id = null;
    model.demandeStage = this.imgURL;


    if (
      data.DemandeStage == 0



    ) {
      this.messageCommande = `<div class="alert
      alert-danger" role="alert">
      remplir votre champ
    </div>`;
    } else {
      this.services.addDemande(model).subscribe(
        (res) => {
          console.log(res);

          this.router.navigate(['/listedemande']);
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
