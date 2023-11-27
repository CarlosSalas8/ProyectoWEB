import {Component, NgModule, OnInit} from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';

  registerUser = async () => {
    try {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      const response = await axios.post('http://localhost:8000/api/users/', userData);
      console.log(response.data); // Aquí puedes manejar la respuesta de la API
    } catch (error) {
      console.error(error);
    }
  };
  ngOnInit() {}

}
