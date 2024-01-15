import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { Stepper, Carousel,initTE,} from 'tw-elements';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {AuthService} from "../../services/login.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']

})
export class ContenidoCursoComponent implements OnInit{
 contenidoCurso: any[] = [];
  safeConcepto: any; // Esto contendrá el contenido HTML saneado para 'concepto'
  contenidoSeleccionado: any; // Contenido del curso seleccionado

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const idCurso = this.route.snapshot.params['id'];
    this.authService.getContenidoCurso(idCurso).then((data) => {
      this.contenidoCurso = data;
      if (this.contenidoCurso.length > 0) {
        // Establecer el primer curso como seleccionado por defecto
        this.contenidoSeleccionado = this.contenidoCurso[0];
        this.safeConcepto = this.sanitizer.bypassSecurityTrustHtml(this.contenidoSeleccionado.concepto);
      }
    });
  }
  seleccionarCurso(idCurso: number) {
    // Encuentra el curso por su ID y actualiza el contenidoSeleccionado
    this.contenidoSeleccionado = this.contenidoCurso.find(curso => curso.id === idCurso);
    this.safeConcepto = this.sanitizer.bypassSecurityTrustHtml(this.contenidoSeleccionado.concepto);
  }



}
