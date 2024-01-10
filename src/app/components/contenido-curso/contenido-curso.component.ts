import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { Stepper, Carousel,initTE,} from 'tw-elements';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {AuthService} from "../../services/login.service";

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']

})
export class ContenidoCursoComponent implements OnInit,AfterViewInit{
  openStepIndex: number | null = null;
  id: number | undefined;
  slides = []; // <-- Agregue esta línea
  contenidoCurso: Array<any> = [];
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
              private elRef: ElementRef) {}
  ngOnInit() {
    const idCurso = this.route.snapshot.params['id'];
    this.authService.getContenidoCurso(idCurso)
      .then(contenidoCurso => {
        this.contenidoCurso = contenidoCurso;
        (this.slides as number[]) = this.contenidoCurso.map((_x, i) => i); // <-- Además de esta línea
      })
      .catch(error => console.error(error));
      this.openStepIndex = 0;

  }


  ngAfterViewInit(): void {
  }
  activeSlideIndex = 0;

  nextSlide() {
    const nextIndex = (this.activeSlideIndex + 1) % this.contenidoCurso.length;

    this.activeSlideIndex = nextIndex;
  }

  // Actualiza la función prevSlide para abrir el paso anterior y cerrar los demás
  prevSlide() {
    const prevIndex = (this.activeSlideIndex - 1 + this.contenidoCurso.length) % this.contenidoCurso.length;

    this.activeSlideIndex = prevIndex;
  }
  toggleStep(index: number) {
    if (this.openStepIndex === index) {
      // Si el paso ya está abierto, lo cerramos
      this.openStepIndex = null;
    } else {
      // Abrimos el paso clickeado y cerramos los otros
      this.openStepIndex = index;
    }
  }

}
