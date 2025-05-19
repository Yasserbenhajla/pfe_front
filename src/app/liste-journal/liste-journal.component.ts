import { Component } from '@angular/core';
import { Journal } from '../Entities/Journal.Entities';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-journal',
  templateUrl: './liste-journal.component.html',
  styleUrls: ['./liste-journal.component.css']
})
export class ListeJournalComponent {
listJournal:Journal[]
  constructor(private service:CrudService,private router:Router){}
  ngOnInit():void{
    this.service.getJournal().subscribe(journal=>{
      this.listJournal=journal
    })
  }
}
