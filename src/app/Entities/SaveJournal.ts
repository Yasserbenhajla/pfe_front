import { Etudiant } from "./Etudiant.Entities";

export class SaveJournal {
  constructor(
    public id ?:number ,
    public journal ?:string ,
    public idEtudiant?:number,

  ){

  }
}
