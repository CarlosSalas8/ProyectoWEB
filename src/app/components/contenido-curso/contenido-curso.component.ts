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
  }


  ngAfterViewInit(): void {
  }
  activeSlideIndex = 0;

  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.contenidoCurso.length;
  }

  prevSlide() {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.contenidoCurso.length) % this.contenidoCurso.length;
  }

}
