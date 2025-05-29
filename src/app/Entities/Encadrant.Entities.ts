import { Qualite } from "./Qualite.Entities";
import { Specialite } from "./Specialite.Entities";

export class Encadrant {
  constructor(
    public id ?:number ,
    public nom ?:string ,
    public prenom ?:string ,
    public email ?:string ,
    public password ?:string ,
    public tel ?:string ,
    public qualite?:Qualite,
    public specialite?:Specialite,
    public etat ?:boolean,
  ){

  }
}
