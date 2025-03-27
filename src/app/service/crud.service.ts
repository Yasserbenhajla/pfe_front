import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entities/Admin.Entities';
import { Observable } from 'rxjs';
import { Etudiant } from '../Entities/Etudiant.Entities';
import { Encadrant } from '../Entities/Encadrant.Entities';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
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




}
