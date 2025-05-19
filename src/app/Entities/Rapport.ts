import { Encadrant } from "./Encadrant.Entities";
import { Etudiant } from "./Etudiant.Entities";

export class Rapport {
  constructor(
    public id ?:number ,
    public rapport ?:string ,
    public etudiant?:Etudiant,
    public encadrant?:Encadrant,

  ){

  }
}
