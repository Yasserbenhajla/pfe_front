import { Component } from '@angular/core';
import { Stage } from '../Entities/Stage';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-stage',
  templateUrl: './liste-stage.component.html',
  styleUrls: ['./liste-stage.component.css']
})
export class ListeStageComponent {
listStage:Stage[]
    constructor(private service:CrudService,private router:Router){}
    ngOnInit():void{
      this.service.getStage().subscribe(stage=>{
        this.listStage=stage
      })
    }

}


