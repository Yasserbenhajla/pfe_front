import { Etudiant } from "./Etudiant.Entities";
import { TypeStage } from "./TypeStage";

export class Stage {
  constructor(
    public id?: number,
    public intitule?: string,
    public description?: string,
    public lieu?: string,
    public pays?: string,
    public technologieOutil?: string,
    public nomEntreprise?: string,
    public dateDeb?: Date,
    public dateFin?: Date,
    public typeDeStage?: TypeStage,
    public etudiant?: Etudiant
  ) {}
}
