import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {RegisterComponent} from "./components/register/register.component";
import {AprenderContabilidadComponent} from "./components/aprender-contabilidad/aprender-contabilidad.component";
import { EstadoComponent } from './components/estado/estado.component';
import { ContenidoCursoComponent } from './components/contenido-curso/contenido-curso.component';
import {AjustesComponent} from "./components/ajustes/ajustes.component";
import {RegistroDatosComponent} from "./components/registro-datos/registro-datos.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ResultadosComponent} from "./components/resultados/resultados.component";
import { InicioRegistroComponent } from './components/inicio-registro/inicio-registro.component';
import { InventarioComponent } from './inventario/inventario.component';

import { AuthGuard } from './guards/auth.guard';
import {NoAuthGuard} from "./guards/no-auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'inicio', component: InicioComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {path: 'cursos/aprenderContabilidad', component: AprenderContabilidadComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/datos/registrar', component: EstadoComponent,canActivate: [AuthGuard]},
  {path: 'cursos/aprenderContabilidad/contenido-curso/:id', component: ContenidoCursoComponent,canActivate: [AuthGuard]},
  {path: 'ajustes',component:AjustesComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/datos/estado',component:RegistroDatosComponent,canActivate: [AuthGuard]},
  {path: 'sidebar',component:SidebarComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/resultados',component:ResultadosComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/datos/registro',component:InicioRegistroComponent,canActivate: [AuthGuard]},
  {path: 'herramienta/datos/inventario',component:InventarioComponent,canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
