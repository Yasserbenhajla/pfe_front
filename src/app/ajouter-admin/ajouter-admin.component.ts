import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../Entities/Admin.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouter-admin',
  templateUrl: './ajouter-admin.component.html',
  styleUrls: ['./ajouter-admin.component.css']
})
export class AjouterAdminComponent {

messageCommande=""
  adminForm:FormGroup

  constructor(private services : CrudService , private router : Router,private fb:FormBuilder) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,
      Validators.minLength(4)]),
        prenom: new FormControl('',[
          Validators.required,]),

      email: new FormControl('',[
        Validators.required,
      Validators.email]),
      password: new FormControl('',[
        Validators.required,]),
     role: new FormControl('',[
          Validators.required,])}
     this.adminForm = this.fb.group(formControls)
   }
   get nom() {return this.adminForm.get('nom');}
   get prenom() {return this.adminForm.get('prenom');}
  get email() { return this.adminForm.get('email');}
  get password() {return this.adminForm.get('password');}
  get role() {return this.adminForm.get('role');}

   addNewAdmin() {
    let data = this.adminForm.value;
    console.log(data);
    let admin = new Admin(
     undefined, data.nom,data.prenom,data.email,data.password,data.role);
    console.log(admin);

    if (
      data.nom == 0 ||
      data.prenom == 0 ||
      data.email == 0||
      data.password == 0||
      data.role == 0
    ) {
      this.messageCommande=`<div class="alert alert-danger" role="alert">
      remplir votre champ
    </div>`

    } else {
    this.services.addadmin(admin).subscribe(
      res=>{
        console.log(res);
        this.messageCommande=`<div class="alert alert-success" role="alert">
        avec success
      </div>`

        this.router.navigate(['/listeAdmin']).then(()=>{window.location.reload()})
        ;
      },
       err=>{
        this.messageCommande=`<div class="alert alert-warning" role="alert">
        EMAIL EXISTE deja!!!!
      </div>`

      })
      setTimeout(() => {
        this.messageCommande=""
      }, 3000);

    }
  }



  ngOnInit(): void {
  }
}

