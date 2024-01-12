import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../../services/login.service";

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']
})
export class ContenidoCursoComponent implements OnInit, AfterViewInit {
  openStepIndex: number | null = 0; // Iniciar con el primer paso abierto
  contenidoCurso: Array<any> = [];
  activeSlideIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    const idCurso = this.route.snapshot.params['id'];
    this.authService.getContenidoCurso(idCurso)
      .then(contenidoCurso => {
        this.contenidoCurso = contenidoCurso;
        // Inicializar el carrusel con los pasos del curso
        // Si estás usando un carrusel o cualquier otro componente de tw-elements, asegúrate de inicializarlo aquí si es necesario.
      })
      .catch(error => console.error(error));
  }

  ngAfterViewInit(): void {
    // Si tw-elements requiere inicialización, hazlo aquí.
    // initTE(); // Descomenta esta línea si necesitas inicializar tw-elements manualmente.
  }

  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.contenidoCurso.length;
  }

  prevSlide() {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.contenidoCurso.length) % this.contenidoCurso.length;
  }

  toggleStep(index: number) {
    this.openStepIndex = this.openStepIndex === index ? null : index;
  }
}
