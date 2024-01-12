import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-aprender-contabilidad',
  templateUrl: './aprender-contabilidad.component.html',
  styleUrls: ['./aprender-contabilidad.component.css']
})
export class AprenderContabilidadComponent {
  cursos: any[] = [];

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit() {
    this.authService.getTodosLosCursos().subscribe(
      data => {
        this.cursos = data || [];
        this.cursos.forEach(curso => (curso.showMore = false));
      },
      err => console.error(err),
    );
  }

  toggleDescription(curso: any): void {
    curso.showMore = !curso.showMore;
  }

  truncateDescription(description: string, wordCount: number, showMore: boolean): string {
    if (showMore) {
      return description; // Mostrar el texto completo si 'showMore' es verdadero
    } else {
      const words = description.split(' ');
      const truncated = words.slice(0, wordCount).join(' ');

      return truncated + (words.length > wordCount ? '...' : '');
    }
  }
  scrollTo(section: string): void {
    const element = document.querySelector('#' + section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Elemento no encontrado:', section);
    }
  }

  aplicarAnimacion(elementoTexto: HTMLElement): void {
    this.renderer.addClass(elementoTexto, 'focus-in-expand');
    setTimeout(() => {
      this.renderer.removeClass(elementoTexto, 'focus-in-expand');
    }, 950);
  }
}
