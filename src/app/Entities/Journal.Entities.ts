import { Etudiant } from "./Etudiant.Entities";

export class Journal {
  constructor(
    public id ?:number ,
    public journal ?:string ,
    public etudiant?:Etudiant,

  ){

  }
}
