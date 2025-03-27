import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Entities/Admin.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent {


listAdmin:Admin[]
  constructor(private service:CrudService,private router:Router){}
  ngOnInit():void{
    this.service.getAdmin().subscribe(admin=>{
      this.listAdmin=admin
    })
  }
  DeleteAdmin(admin: Admin){
    if(confirm("Voulez vous supprimer ce message de admin avec l'ID " +admin.id+ "?")) {

      this.service.onDeleteAdmin(admin.id).subscribe(() => {
        this.router.navigate(['/listeAdmin']).then(() => {
          window.location.reload()
        })
      })

  }
}


}
