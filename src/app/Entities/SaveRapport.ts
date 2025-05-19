import { Etudiant } from "./Etudiant.Entities";

export class SaveRapport {
  constructor(
    public id ?:number ,
    public rapport ?:string ,
    public idEtudiant?:number,
    public idEncadrant?:number,

  ){

  }
}
