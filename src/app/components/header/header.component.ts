import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from "../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentPage: string;
  username: string;
  email: string;

  constructor(private location: Location, private authService: AuthService) {
    this.currentPage = this.location.path();
    this.username = localStorage.getItem('username') || '';
    this.email = localStorage.getItem('email') || '';
  }

  isDropdownVisible = false;

  // Método para alternar la visibilidad del menú desplegable
  toggleDropdown() {
    // sólo alterar la visibilidad si el usuario está logueado
    if (this.authService.isUserAuthenticated()) {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }
  logout() {
    this.authService.logout();
  }



}

