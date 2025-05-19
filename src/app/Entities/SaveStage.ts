

export class SaveStage {
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
    public typeDeStageId?: number,
    public etudiantId?: number
  ) {}
}
