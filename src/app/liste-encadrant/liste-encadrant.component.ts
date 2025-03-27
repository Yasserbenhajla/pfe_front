import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-encadrant',
  templateUrl: './liste-encadrant.component.html',
  styleUrls: ['./liste-encadrant.component.css']
})
export class ListeEncadrantComponent {

  listEncadrant: Encadrant[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getEncadrants().subscribe(encadrants => {
      this.listEncadrant = encadrants;
    });
  }

  DeleteEncadrant(encadrant: Encadrant) {
    if (confirm("Voulez-vous supprimer cet encadrant avec l'ID " + encadrant.id + " ?")) {
      this.service.onDeleteEncadrant(encadrant.id).subscribe(() => {
        this.listEncadrant = this.listEncadrant.filter(e => e.id !== encadrant.id);
      });
    }
  }

}
