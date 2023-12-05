import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { Stepper, initTE,} from 'tw-elements';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']
})
export class ContenidoCursoComponent implements OnInit,AfterViewInit{
  constructor() { }

  ngOnInit() {
    // Llamando a initTE solo cuando el componente está inicializado
  }

  ngAfterViewInit() {
    // Llamando a initTE después de que la vista del componente ha sido inicializada
    initTE({ Stepper });
  }



  slides = [
    { title: 'Conceptos Básicos', content: 'Contenido del Slide 1' },
    { title: 'Slide 2', content: 'Contenido del Slide 2' },
    { title: 'Slide 3', content: 'Contenido del Slide 3' },
  ];

  currentSlideIndex = 0;

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }
}
