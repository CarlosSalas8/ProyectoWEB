import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {RegisterComponent} from "./components/register/register.component";
import {InicioCursoComponent} from "./components/inicio-curso/inicio-curso.component";
import {AprenderContabilidadComponent} from "./components/aprender-contabilidad/aprender-contabilidad.component";
import { ContenidoCursoComponent } from './contenido-curso/contenido-curso.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'inicioCurso', component: InicioCursoComponent},
  {path: 'aprenderContabilidad', component: AprenderContabilidadComponent},
  {path: 'contenido-curso', component: ContenidoCursoComponent},
  {path: '**', redirectTo: 'inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
