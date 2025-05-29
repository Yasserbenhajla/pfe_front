import { Component } from '@angular/core';
import { Sujet } from '../Entities/Sujet.Entities';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-liste-sujet',
  templateUrl: './liste-sujet.component.html',
  styleUrls: ['./liste-sujet.component.css'],

})
export class ListeSujetComponent {
  listSujet:Sujet[]
    constructor(private service:CrudService,private router:Router){}
    reflech=new Subject<void>()


    ngOnInit():void{
      this.reflech.subscribe(()=>{

    })
      this.service.getSujets().subscribe(sujet=>{
        this.listSujet=sujet
      })
    }
     valider(event: any) {
  console.log(event)
  let rq: any = {};
  rq.idSujet = event.id;
  rq.status = 1;
  this.service.validerOuAnnulerFromApi(rq).subscribe(() => {
    this.reflech.next();
  });
}

 annuler(event: any) {
  console.log("Event reçu dans annuler():", event);
  const id = event.id || event.idSujet;

  if (!id || id === 0) {
    console.error("ID du sujet introuvable ou invalide :", id, event);
    return;
  }

  this.service.annuler(id).subscribe(() => {
    this.reflech.next();
  });
}



}
