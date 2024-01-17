import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { Stepper, Carousel,initTE,} from 'tw-elements';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {AuthService} from "../../services/login.service";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';


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
        this.contenidoSeleccionado = this.contenidoCurso[0];
        this.actualizarUrlsRecursos();
        this.safeConcepto = this.sanitizer.bypassSecurityTrustHtml(this.contenidoSeleccionado.concepto);
      }
    });
  }

  seleccionarCurso(idCurso: number) {
    this.contenidoSeleccionado = this.contenidoCurso.find(curso => curso.id === idCurso);
    this.actualizarUrlsRecursos();
    this.safeConcepto = this.sanitizer.bypassSecurityTrustHtml(this.contenidoSeleccionado.concepto);
  }

  actualizarUrlsRecursos() {
    if (this.contenidoSeleccionado && this.contenidoSeleccionado.recursos) {
      this.contenidoSeleccionado.recursos.forEach((recurso: any) => {
        // Ajustar URL para imágenes
        if (recurso.detalle_recurso && recurso.detalle_recurso.imagen) {
          recurso.detalle_recurso.imagen = `http://localhost:8000${recurso.detalle_recurso.imagen}`;
        }

        // Ajustar URL para videos y sanitizar
        if (recurso.detalle_recurso && recurso.detalle_recurso.video) {
          let videoUrl = `http://localhost:8000${recurso.detalle_recurso.video}`;
          recurso.detalle_recurso.video = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        }
      });
    }

  }
  getSafeUrl(url: string): SafeResourceUrl {
    // Verificar si la URL ya es una URL de incrustación
    if (url.includes('youtube.com/embed/')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // Extraer el ID del video si la URL es una URL de página de YouTube
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    // Verificar si la URL es válida y obtener el ID del video
    const videoId = match && match[2].length === 11 ? match[2] : null;

    // Construir la URL de incrustación utilizando el ID del video
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    // Si no se encuentra el ID del video, retornar la URL original
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
