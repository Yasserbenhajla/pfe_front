import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { LoginComponent } from './login/login.component';
import { AjouterEtudiantComponent } from './ajouter-etudiant/ajouter-etudiant.component';
import { ListeetudiantComponent } from './listeetudiant/listeetudiant.component';
import { AjouterEncadrantComponent } from './ajouter-encadrant/ajouter-encadrant.component';
import { ListeEncadrantComponent } from './liste-encadrant/liste-encadrant.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { ModifierEtudiantComponent } from './modifier-etudiant/modifier-etudiant.component';
import { ModifierEncadrantComponent } from './modifier-encadrant/modifier-encadrant.component';
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

const routes: Routes = [
  {path:'ajouterAdmin',component:AjouterAdminComponent},
  {path:'listeAdmin',component:ListeAdminComponent},
  {path:'',component:LoginComponent},
  {path:'ajouterEtudiant',component:AjouterEtudiantComponent},
  {path:'listeEtudiant',component:ListeetudiantComponent},
  {path:'ajouterencadrant',component:AjouterEncadrantComponent},
  {path:'listeEncadrant',component:ListeEncadrantComponent},
  {path:'modifierAdmin/:id',component:ModifierAdminComponent},
  {path:'modifierEtudiant/:id',component:ModifierEtudiantComponent},
  {path:'modifierEncadrant/:id',component:ModifierEncadrantComponent},
  {path:'home',component:HomeComponent},
  {path:'ajouterSpecialite',component:AjouterSpecialiteComponent},
  {path:'listeSpecialite',component:ListSpecialiteComponent},
  {path:'ajouterQualite',component:AjouterQualiteComponent},
  {path:'listeQualite',component:ListeQualiteComponent},
  {path:'ajouterAffectation',component:AjouterAffectationEncadrantComponent},
  {path:'ListeAffectation',component:ListeAffectationComponent},
  {path:'ListeJournal',component:ListeJournalComponent},
  {path:'ListeSujet',component:ListeSujetComponent},
  {path:'listeRapport', component:ListeRapportComponent},
  {path:'AjouterTypeStage', component:AjouterTypeStageComponent},
  {path:'listeTypeStage', component:ListeTypeStageComponent},
  {path:'demandeStage', component:DemandeStageComponent},
  {path:'listeConfirmationStage', component:ListeConfirmationStageComponent},
  {path:'AjouterLettreAffectation', component:AjouterLettreAffectationComponent},
  {path:'ajouterDepartment',component:AjouterDepartmentComponent},
  {path:'listeDepartment',component:ListeDepartmentComponent},
  {path:'listeStage',component:ListeStageComponent},
  {path:'listeRapportFinal',component:ListeRapportFinalComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
