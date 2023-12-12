import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/login.service";
@Injectable({
  providedIn: "root"
})

export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/inicioCurso']); // redirige a la página segura aquí
      return false;
    }
    return true;
  }
}
