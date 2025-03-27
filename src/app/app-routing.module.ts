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

const routes: Routes = [
  {path:'ajouteretudiant',component:AjouterAdminComponent},
  {path:'listeAdmin',component:ListeAdminComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:AjouterEtudiantComponent},
  {path:'listeEtudiant',component:ListeetudiantComponent},
  {path:'ajouterencadrant',component:AjouterEncadrantComponent},
  {path:'listeEncadrant',component:ListeEncadrantComponent},
  {path:'modifierAdmin/:id',component:ModifierAdminComponent},
  {path:'modifierEtudiant/:id',component:ModifierEtudiantComponent},
  {path:'modifierEncadrant/:id',component:ModifierEncadrantComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
