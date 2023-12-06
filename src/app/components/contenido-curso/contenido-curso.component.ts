import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { Stepper, Carousel,initTE,} from 'tw-elements';

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
    initTE({ Stepper,Carousel });
  }


}
