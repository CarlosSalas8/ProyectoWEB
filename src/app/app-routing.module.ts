import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {RegisterComponent} from "./components/register/register.component";
import {InicioCursoComponent} from "./components/inicio-curso/inicio-curso.component";
import {AprenderContabilidadComponent} from "./components/aprender-contabilidad/aprender-contabilidad.component";
import { EstadoComponent } from './components/estado/estado.component';
import { ContenidoCursoComponent } from './components/contenido-curso/contenido-curso.component';
import {AjustesComponent} from "./components/ajustes/ajustes.component";
import {RegistroDatosComponent} from "./components/registro-datos/registro-datos.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ResultadosComponent} from "./components/resultados/resultados.component";
import { AuthGuard } from './guards/auth.guard';
import {NoAuthGuard} from "./guards/no-auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'inicio', component: InicioComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {path: 'inicioCurso', component: InicioCursoComponent, canActivate: [AuthGuard]},
  {path: 'aprenderContabilidad', component: AprenderContabilidadComponent,canActivate: [AuthGuard]},
  {path: 'estado', component: EstadoComponent,canActivate: [AuthGuard]},
  {path: 'contenido-curso/:id', component: ContenidoCursoComponent,canActivate: [AuthGuard]},
  {path: 'ajustes',component:AjustesComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/registro',component:RegistroDatosComponent,canActivate: [AuthGuard]},
  {path: 'sidebar',component:SidebarComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/resultados',component:ResultadosComponent,canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
