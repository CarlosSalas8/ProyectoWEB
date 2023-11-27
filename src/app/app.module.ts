import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
=======
import {AuthService} from "./services/login.service";
>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b

//Components
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import {HeaderComponent} from "./components/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import { InicioCursoComponent } from './components/inicio-curso/inicio-curso.component';
import { AprenderContabilidadComponent } from './components/aprender-contabilidad/aprender-contabilidad.component';
<<<<<<< HEAD
import { EstadoComponent } from './components/estado/estado.component';
=======
import { FooterComponent } from './footer/footer.component';
import { ContenidoCursoComponent } from './contenido-curso/contenido-curso.component';

>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    InicioComponent,
    LoginComponent,
    HeaderComponent,
    InicioCursoComponent,
    AprenderContabilidadComponent,
<<<<<<< HEAD
    EstadoComponent
=======
    FooterComponent,
    ContenidoCursoComponent
>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    ReactiveFormsModule
=======
    FormsModule
>>>>>>> ccc97fa027546750d111eab14aae861467f96f5b
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
