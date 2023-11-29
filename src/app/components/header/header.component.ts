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

  constructor(private location: Location, private authService: AuthService) { // Inyesctas el servicio aquí
    this.currentPage = this.location.path();
  }

  isDropdownVisible = false;

  // Método para alternar la visibilidad del menú desplegable
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  logout() {
    this.authService.logout();
  }

}

