import { Component } from '@angular/core';
import { Affectation } from '../Entities/Affectation';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-affectation',
  templateUrl: './liste-affectation.component.html',
  styleUrls: ['./liste-affectation.component.css']
})
export class ListeAffectationComponent {
listAffectation:Affectation[]
  constructor(private service:CrudService,private router:Router){}
  ngOnInit():void{
    this.service.getAffectation().subscribe(affectation=>{
      this.listAffectation=affectation
    })
  }


  }



