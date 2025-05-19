import { Etudiant } from "./Etudiant.Entities";

export class Sujet {
  constructor(
    public id?: number,
    public description?: string,
    public status?:boolean,
    public etudiant?:Etudiant
  ) {}
}
