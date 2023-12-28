import { Component } from '@angular/core';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-aprender-contabilidad',
  templateUrl: './aprender-contabilidad.component.html',
  styleUrls: ['./aprender-contabilidad.component.css']
})
export class AprenderContabilidadComponent {
  cursos: any[] = [];

  constructor(private authService: AuthService) { }

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
}
