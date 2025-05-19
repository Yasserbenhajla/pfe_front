import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeetudiantComponent } from './listeetudiant/listeetudiant.component';
import { AjouterEtudiantComponent } from './ajouter-etudiant/ajouter-etudiant.component';
import { AjouterEncadrantComponent } from './ajouter-encadrant/ajouter-encadrant.component';
import { ListeEncadrantComponent } from './liste-encadrant/liste-encadrant.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { ModifierEtudiantComponent } from './modifier-etudiant/modifier-etudiant.component';
import { ModifierEncadrantComponent } from './modifier-encadrant/modifier-encadrant.component';
import { HomeComponent } from './home/home.component';
import { AjouterSpecialiteComponent } from './ajouter-specialite/ajouter-specialite.component';
import { ListSpecialiteComponent } from './list-specialite/list-specialite.component';
import { AjouterQualiteComponent } from './ajouter-qualite/ajouter-qualite.component';
import { ListeQualiteComponent } from './liste-qualite/liste-qualite.component';
import { AjouterAffectationEncadrantComponent } from './ajouter-affectation-encadrant/ajouter-affectation-encadrant.component';
import { ListeAffectationComponent } from './liste-affectation/liste-affectation.component';
import { ListeJournalComponent } from './liste-journal/liste-journal.component';
import { ListeSujetComponent } from './liste-sujet/liste-sujet.component';
import { ListeRapportComponent } from './liste-rapport/liste-rapport.component';
import { AjouterTypeStageComponent } from './ajouter-type-stage/ajouter-type-stage.component';
import { ListeTypeStageComponent } from './liste-type-stage/liste-type-stage.component';
import { DemandeStageComponent } from './demande-stage/demande-stage.component';
import { ListeConfirmationStageComponent } from './liste-confirmation-stage/liste-confirmation-stage.component';
import { AjouterLettreAffectationComponent } from './ajouter-lettre-affectation/ajouter-lettre-affectation.component';
import { AjouterDepartmentComponent } from './ajouter-department/ajouter-department.component';
import { ListeDepartmentComponent } from './liste-department/liste-department.component';
import { ListeStageComponent } from './liste-stage/liste-stage.component';
import { ListeRapportFinalComponent } from './liste-rapport-final/liste-rapport-final.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeAdminComponent,
    AjouterAdminComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ListeetudiantComponent,
    AjouterEtudiantComponent,
    AjouterEncadrantComponent,
    ListeEncadrantComponent,
    ModifierAdminComponent,
    ModifierEtudiantComponent,
    ModifierEncadrantComponent,
    HomeComponent,
    AjouterSpecialiteComponent,
    ListSpecialiteComponent,
    AjouterQualiteComponent,
    ListeQualiteComponent,
    AjouterAffectationEncadrantComponent,
    ListeAffectationComponent,
    ListeJournalComponent,
    ListeSujetComponent,
    ListeRapportComponent,
    AjouterTypeStageComponent,
    ListeTypeStageComponent,
    DemandeStageComponent,
    ListeConfirmationStageComponent,
    AjouterLettreAffectationComponent,
    AjouterDepartmentComponent,
    ListeDepartmentComponent,
    ListeStageComponent,
    ListeRapportFinalComponent
  ], // ICI il manquait la fermeture du tableau

  imports: [ // Ce bloc était mal placé
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
