import { Etudiant } from "./Etudiant.Entities";

export class SaveSujet {
  constructor(
    public id?: number,
    public description?: string,
    public status?:number,
    public idEtudiant?:number
  ) {}
}
