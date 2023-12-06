import { Component } from '@angular/core';
import {AuthService} from "../../services/login.service";

@Component({
  selector: 'app-aprender-contabilidad',
  templateUrl: './aprender-contabilidad.component.html',
  styleUrls: ['./aprender-contabilidad.component.css']
})
export class AprenderContabilidadComponent {
  cursos: any[] | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTodosLosCursos().subscribe(
      data => this.cursos = data,
      err => console.error(err),
    );
  }
}
