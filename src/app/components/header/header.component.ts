import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentPage: string;

  constructor(private location: Location) {
    this.currentPage = this.location.path();
  }

  isDropdownVisible = false;

  // Método para alternar la visibilidad del menú desplegable
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


}
