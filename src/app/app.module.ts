import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {AuthService} from "./services/login.service";

//Components
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import {HeaderComponent} from "./components/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import { InicioCursoComponent } from './components/inicio-curso/inicio-curso.component';
import { AprenderContabilidadComponent } from './components/aprender-contabilidad/aprender-contabilidad.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    InicioComponent,
    LoginComponent,
    HeaderComponent,
    InicioCursoComponent,
    AprenderContabilidadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
