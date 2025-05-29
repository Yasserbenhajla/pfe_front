import { SaveDemandeStage } from './../Entities/SaveDemandeStage';
import { SaveAffectation } from './../Entities/SaveAffectation';
import { Specialite } from './../Entities/Specialite.Entities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entities/Admin.Entities';
import { Observable, Subject } from 'rxjs';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Qualite } from '../Entities/Qualite.Entities';
import { Sujet } from '../Entities/Sujet.Entities';
import { Affectation } from '../Entities/Affectation';
import { Journal } from '../Entities/Journal.Entities';
import { Rapport } from '../Entities/Rapport';
import { TypeStage } from '../Entities/TypeStage.Entities';
import { ConfirmationDemande } from '../Entities/ConfirmationDemande';
import { LettreAffectation } from '../Entities/LettreAffectation';
import { Department } from '../Entities/Department';
import { Stage } from '../Entities/Stage';
import { RapportFinal } from '../Entities/RapportFinal';
import { Convention } from '../Entities/Convention';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private _reflechReserve=new Subject<void>();

  get reflechReserve() {
    return this._reflechReserve;
  }
  apiUrl='http://localhost:8081/api'
  helper=new JwtHelperService()
  loginUserUrl='http://localhost:8081/api/Admin/login'
  constructor(
    private http:HttpClient) { }

    addadmin(admin:Admin){
      return this.http.post<any>(this.apiUrl+"/Admin", admin);
    }

    getAdmin(): Observable<Admin[]>{
      return this.http.get<Admin[]>(this.apiUrl + "/Admin");
    }
  onDeleteAdmin(id: number){
      const url =`${this.apiUrl+"/Admin"}/${id}`
      return this.http.delete(url )
    }


    addetudiant(etudiant:Etudiant){
      return this.http.post<any>(this.apiUrl+"/Etudiant", etudiant);
    }

    getEtudiant(): Observable<Etudiant[]>{
      return this.http.get<Etudiant[]>(this.apiUrl + "/Etudiant");
    }
  onDeleteEtudiant(id: number){
      const url =`${this.apiUrl+"/Etudiant"}/${id}`
      return this.http.delete(url )
    }


    addEncadrant(encadrant: Encadrant) {
      return this.http.post<any>(this.apiUrl + "/Encadrant", encadrant);
    }

    getEncadrants(): Observable<Encadrant[]> {
        return this.http.get<Encadrant[]>(this.apiUrl + "/Encadrant");
    }

    onDeleteEncadrant(id: number) {
      const url = `${this.apiUrl + "/Encadrant"}/${id}`;
      return this.http.delete(url);
    }



    findAdminById(id : number): Observable<Admin> {
      const url =` ${this.apiUrl + "/Admin"}/${id};`
      return this.http.get<Admin>(url)
    }

    updateAdmin(id:number,admin: Admin) {
      const url = `${this.apiUrl+"/Admin"}/${id}`
      return this.http.put<any>(url,admin);
    }

  userDetails(){
      let token:any=localStorage.getItem('myToken');
      let decodeToken= this.helper.decodeToken(token);
       return decodeToken.data;
     }


     loginAdmin(admin:Admin){
      return this.http.post<any>(this.loginUserUrl, admin);
    }

    findEtudiantById(id: number): Observable<Etudiant> {
      const url = `${this.apiUrl}/Etudiant/${id}`;
      return this.http.get<Etudiant>(url);
    }
    updateEtudiant(id: number, etudiant: Etudiant) {
      const url = `${this.apiUrl}/Etudiant/${id}`;
      return this.http.put<any>(url, etudiant);
    }

    findEncadrantById(id: number): Observable<Encadrant> {
      const url = `${this.apiUrl}/Encadrant/${id}`;
      return this.http.get<Encadrant>(url);
    }

    updateEncadrant(id: number, encadrant: Encadrant) {
      const url = `${this.apiUrl}/Encadrant/${id}`;
      return this.http.put<any>(url, encadrant);
    }


    addspecialte(Specialite:Specialite){
      return this.http.post<any>(this.apiUrl+"/Specialite", Specialite);
    }

    getSpecialite(): Observable<Specialite[]> {
      return this.http.get<Specialite[]>(this.apiUrl + "/Specialite");
    }

    addQualite(qualite: Qualite) {
      return this.http.post<Qualite>(this.apiUrl + "/Qualite", qualite);
    }


    getQualite(): Observable<Qualite[]> {
      return this.http.get<Qualite[]>(this.apiUrl + "/Qualite");
    }

    getSujet(): Observable<Sujet[]> {
      return this.http.get<Sujet[]>(this.apiUrl + "/sujet");
    }


    addAffectation(SaveAffectation: SaveAffectation) {
      return this.http.post<any>(this.apiUrl + '/affectation', SaveAffectation);
    }

    getAffectation(): Observable<Affectation[]> {
      return this.http.get<Affectation[]>(this.apiUrl + "/affectation");
    }

    getJournal(): Observable<Journal[]> {
      return this.http.get<Journal[]>(this.apiUrl + "/journal");
    }

    getSujets(): Observable<Sujet[]> {
      return this.http.get<Sujet[]>(this.apiUrl + "/sujet");
    }

    getRapport(): Observable<Rapport[]> {
      return this.http.get<Rapport[]>(this.apiUrl + "/rapport");
    }

    addTypeStage(typeStage:TypeStage){
      return this.http.post<any>(this.apiUrl+"/type_stage", typeStage);
    }
    getTypeStage(): Observable<TypeStage[]> {
      return this.http.get<TypeStage[]>(this.apiUrl + "/type_stage");
    }

    addDemande(SaveDemandeStage: SaveDemandeStage) {
      return this.http.post<any>(this.apiUrl + '/demandeStage', SaveDemandeStage);
    }

    getConfirmation(): Observable<ConfirmationDemande[]> {
      return this.http.get<ConfirmationDemande[]>(this.apiUrl + "/Confirmation");
    }

    addLettreAffectation(lettreAffectation:LettreAffectation){
      return this.http.post<any>(this.apiUrl+"/lettreAffectation",lettreAffectation);
    }

    addDepartment(department:Department){
      return this.http.post<any>(this.apiUrl+"/department", department);
    }

    getDepartment(): Observable<Department[]> {
      return this.http.get<Specialite[]>(this.apiUrl + "/department");
    }


    getStage(): Observable<Stage[]> {
      return this.http.get<Stage[]>(this.apiUrl + "/stage");
    }

      getRapportFinal(): Observable<RapportFinal[]> {
      return this.http.get<RapportFinal[]>(this.apiUrl + "/rapportFinal");
    }

      updateQualite(id:number,qualite: Qualite) {
      const url = `${this.apiUrl+"/Qualite"}/${id}`
      return this.http.put<any>(url,qualite);
    }

    validerOuAnnulerFromApi(rq:any){
    return this.http.put<any>( "http://localhost:8081/api/sujet/validate-sujet" ,rq );
  }

  annuler(id:any){
    return this.http.put("http://localhost:8081/api/sujet/annuler/"+id,{});
  }

  findQualiteById(id : number): Observable<Qualite> {
      const url =` ${this.apiUrl + "/Qualite"}/${id};`
      return this.http.get<Qualite>(url)
    }
  updateSpecialite(id:number,specialite:Specialite) {
      const url = `${this.apiUrl+"/Specialite"}/${id}`
      return this.http.put<any>(url,specialite);
    }

    getConvention(): Observable<Convention[]> {
      return this.http.get<Convention[]>(this.apiUrl + "/convention");
    }






}
