import { Component } from '@angular/core';
import { AuthService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login(event: Event, email: string, password: string): void {
    event.preventDefault();
    this.errorMessage = '';
    console.log(`Email: ${this.email}, Password: ${this.password}`); // debug values

    if(this.email && this.password) {
      this.authService.login(this.email, this.password)
        .then((data) => {
          console.log('Logged in');
          console.log(data);  // <-- Aquí encontrarás los datos devueltos por la API
        })
        .catch(error => {
          // handle the error
          console.error(error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.errorMessage = 'Error: ' + error.response.data;
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            this.errorMessage = 'Error: No response from server.';
          } else if (error.message) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            this.errorMessage = 'Error: ' + error.message;
          }
        });
    } else {
      // handle invalid credentials
      this.errorMessage = 'Por favor introduce un correo electrónico y una contraseña válidos.';
    }
  }
}
