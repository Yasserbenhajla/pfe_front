import { Component } from '@angular/core';
import { Sujet } from '../Entities/Sujet.Entities';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-sujet',
  templateUrl: './liste-sujet.component.html',
  styleUrls: ['./liste-sujet.component.css']
})
export class ListeSujetComponent {
  listSujet:Sujet[]
    constructor(private service:CrudService,private router:Router){}
    ngOnInit():void{
      this.service.getSujets().subscribe(sujet=>{
        this.listSujet=sujet
      })
    }

}
