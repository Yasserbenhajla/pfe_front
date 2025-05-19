import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Qualite } from '../Entities/Qualite.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-liste-qualite',
  templateUrl: './liste-qualite.component.html',
  styleUrls: ['./liste-qualite.component.css']
})
export class ListeQualiteComponent {
  listQualite: Qualite[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getQualite().subscribe(qualites => {
      this.listQualite = qualites;
    });
  }

}
