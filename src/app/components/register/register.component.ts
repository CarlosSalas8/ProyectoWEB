import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  registerUser() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.username || !this.email || !this.password) {
      console.error('All fields are required!');
      return;
    }
    this.authService.registerUser(userData).subscribe(response => {
      console.log(response); // Aquí puedes manejar la respuesta de la API
    }, error => {
      console.error(error);
    });
  };
}
