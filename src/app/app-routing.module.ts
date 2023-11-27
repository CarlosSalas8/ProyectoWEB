import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {RegisterComponent} from "./components/register/register.component";
import {InicioCursoComponent} from "./components/inicio-curso/inicio-curso.component";
import {AprenderContabilidadComponent} from "./components/aprender-contabilidad/aprender-contabilidad.component";
<<<<<<< HEAD
import { EstadoComponent } from './components/estado/estado.component';
=======
import { ContenidoCursoComponent } from './contenido-curso/contenido-curso.component';
>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'inicioCurso', component: InicioCursoComponent},
  {path: 'aprenderContabilidad', component: AprenderContabilidadComponent},
<<<<<<< HEAD
  {path: 'estado', component: EstadoComponent},
=======
  {path: 'contenido-curso', component: ContenidoCursoComponent},
>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b
  {path: '**', redirectTo: 'inicio', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
