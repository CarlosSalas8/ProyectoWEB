import { Component } from '@angular/core';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrls: ['./contenido-curso.component.css']
})
export class ContenidoCursoComponent {
  slides = [
    { image: 'https://via.placeholder.com/800x400', title: 'Slide 1', description: 'Description 1' },
    { image: 'https://via.placeholder.com/800x400', title: 'Slide 2', description: 'Description 2' },
    { image: 'https://via.placeholder.com/800x400', title: 'Slide 3', description: 'Description 3' }
  ];

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
