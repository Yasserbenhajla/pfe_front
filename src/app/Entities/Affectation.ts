import { Encadrant } from "./Encadrant.Entities";
import { Sujet } from "./Sujet.Entities";

export class Affectation {
  constructor(
    public id?: number,
    public sujet?: Sujet,
    public encadrant?: Encadrant
  ) {}
}
