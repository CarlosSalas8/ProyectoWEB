import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/login.service';
import { Modal } from 'flowbite';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio-registro',
  templateUrl: './inicio-registro.component.html',
  styleUrls: ['./inicio-registro.component.css']
})
export class InicioRegistroComponent implements AfterViewInit{
  @ViewChild('modalEl') modalElement!: ElementRef;
  modal!: Modal;

  constructor(private authService: AuthService) {
  }
  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement, {
    });
  }

  
  ngOnInit( ): void {
    this.verificarEmprendimientos();
  }

  onSubmit(form: NgForm): void {
    
    if (form.valid) {
      const usuarioId = this.authService.obtenerIdUsuario();
      if (!usuarioId) {
        console.error('El ID del usuario no está disponible.');
        return;
      }
  
      const datosEmprendimiento = {
        nombre: form.value.businessName,
        tipoEmprendimiento: form.value.businessType,
        usuario: [usuarioId]
      };
  
      this.authService.registrarEmprendimiento(datosEmprendimiento).subscribe(
        response => {
          console.log('Emprendimiento registrado con éxito', response);
          this.closeModal(); // Cierra el modal si el registro es exitoso
        },
        error => {
          console.error('Ocurrió un error al registrar el emprendimiento', error);
        }
      );
    }
  }
  

  showModal(): void {
    this.modal.show();
  }

  closeModal(): void {
    this.modal.hide();
  }


verificarEmprendimientos(): void {
  const userId = this.authService.obtenerIdUsuario();
  if (userId) {
    this.authService.tieneEmprendimientoRegistrado(userId).subscribe(
      emprendimientos => {
        if (emprendimientos.length === 0) {
          this.modal.show();
        }
      },
      error => {
        console.error('Error al verificar emprendimientos', error);
      }
    );
  }
}
}

