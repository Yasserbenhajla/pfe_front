import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Entities/Admin.Entities';
import { Specialite } from '../Entities/Specialite.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-specialite',
  templateUrl: './list-specialite.component.html',
  styleUrls: ['./list-specialite.component.css']
})
export class ListSpecialiteComponent {
  listSpecialite:Specialite[]
    constructor(private service:CrudService,private router:Router){}
    ngOnInit():void{
      this.service.getSpecialite().subscribe(specialite=>{
        this.listSpecialite=specialite
      })
    }


    }
