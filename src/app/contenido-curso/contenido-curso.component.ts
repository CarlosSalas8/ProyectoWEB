import { Component } from '@angular/core';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']
})
export class ContenidoCursoComponent {
  slides = [
    { title: 'Slide 1', content: 'Contenido del Slide 1' },
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
