import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "./services/login.service";

//Components
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import {HeaderComponent} from "./components/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import { InicioCursoComponent } from './components/inicio-curso/inicio-curso.component';
import { AprenderContabilidadComponent } from './components/aprender-contabilidad/aprender-contabilidad.component';
import { EstadoComponent } from './components/estado/estado.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContenidoCursoComponent } from './components/contenido-curso/contenido-curso.component';
import {AuthGuard} from "./guards/auth.guard";
import {NoAuthGuard} from "./guards/no-auth.guard";
import {HttpClientModule} from "@angular/common/http";
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { RegistroDatosComponent } from './components/registro-datos/registro-datos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { InicioRegistroComponent } from './components/inicio-registro/inicio-registro.component';
import { InventarioComponent } from './inventario/inventario.component';

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    InicioComponent,
    LoginComponent,
    HeaderComponent,
    InicioCursoComponent,
    AprenderContabilidadComponent,
    EstadoComponent,
    FooterComponent,
    ContenidoCursoComponent,
    AjustesComponent,
    RegistroDatosComponent,
    SidebarComponent,
    ResultadosComponent,
    TabbarComponent,
    InicioRegistroComponent,
    InventarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,

  ],
  providers: [AuthService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
