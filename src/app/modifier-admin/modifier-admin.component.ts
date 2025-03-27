import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Admin } from '../Entities/Admin.Entities';

@Component({
  selector: 'app-modifier-admin',
  templateUrl: './modifier-admin.component.html',
  styleUrls: ['./modifier-admin.component.css']
})
export class ModifierAdminComponent {
  id:number
  messageCommande=""
    adminForm:FormGroup

    constructor(private services : CrudService , private router : Router,private fb:FormBuilder,private rout:ActivatedRoute) {
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

    ngOnInit(): void {
      let idEvent = this.rout.snapshot.params['id'];
      this.id = idEvent;
      this.services.findAdminById(idEvent).subscribe((result) => {
        let event = result;
        console.log(event);
        this.adminForm.patchValue({
          nom: event.nom,
          prenom: event.prenom,
          email: event.email,
          password: event.password,
          role: event.role,
         });}); }
    updateAdmin() {
      let data = this.adminForm.value;
      let admin =new Admin(
        this.id,
        data.nom,
        data.prenom,
        data.email,
        data.password,
        data.role,
         );
      console.log(admin);
      console.log(data);
      this.services.updateAdmin(this.id,admin).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/listeAdmin']).then(()=>window.location.reload())}); }

}
