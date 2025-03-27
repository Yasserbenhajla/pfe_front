import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listeetudiant',
  templateUrl: './listeetudiant.component.html',
  styleUrls: ['./listeetudiant.component.css']
})
export class ListeetudiantComponent {

  listEtudiant: Etudiant[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.service.getEtudiant().subscribe(etudiants => {
      this.listEtudiant = etudiants;
    });
  }

  DeleteEtudiant(etudiant: Etudiant) {
    if (confirm("Voulez-vous supprimer cet étudiant avec l'ID " + etudiant.id + " ?")) {
      this.service.onDeleteEtudiant(etudiant.id).subscribe(() => {
        this.listEtudiant = this.listEtudiant.filter(e => e.id !== etudiant.id);
      });
    }
  }
}
