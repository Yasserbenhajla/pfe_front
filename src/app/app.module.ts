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
    ModifierEncadrantComponent
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
