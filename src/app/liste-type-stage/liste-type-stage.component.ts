import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { TypeStage } from '../Entities/TypeStage.Entities';

@Component({
  selector: 'app-liste-type-stage',
  templateUrl: './liste-type-stage.component.html',
  styleUrls: ['./liste-type-stage.component.css']
})
export class ListeTypeStageComponent {
  listTypeStage:TypeStage[]
      constructor(private service:CrudService,private router:Router){}
      ngOnInit():void{
        this.service.getTypeStage().subscribe(TypeStage=>{
          this.listTypeStage=TypeStage
        })
      }

}
