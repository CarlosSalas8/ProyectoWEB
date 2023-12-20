import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/login.service";
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent {
  userForm!: FormGroup;
  constructor(private userService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profession: ['', Validators.required],
      bio: ['']
    });
    const storedUser = {
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
      email: localStorage.getItem('email'),
      profession: localStorage.getItem('profession'),
      bio: localStorage.getItem('bio')
    };

    this.userForm.patchValue(storedUser);
  }
  updateUser(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.updateUser(userData).subscribe(
        (response) => {
          // Actualización exitosa, maneja la respuesta si es necesario
          console.log('Usuario actualizado correctamente', response);
        },
        (error) => {
          // Maneja cualquier error de actualización
          console.error('Error al actualizar el usuario', error);
        }
      );
    }
  }
}
