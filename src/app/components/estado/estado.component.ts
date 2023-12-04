import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})

export class EstadoComponent implements OnInit {
  miFormulario!: FormGroup; // Agregamos '!' al final

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.miFormulario = this.fb.group({
      inversionInicial: ['', Validators.required],
      inversionProgresiva: ['', Validators.required],
      presupuesto: ['', Validators.required],
      ganancias: [''],
      perdidas: ['']
    });
    this.miFormulario.get('perdidas')?.disable();
    this.miFormulario.get('ganancias')?.disable()
  }

  // Función para actualizar automáticamente ganancias y pérdidas
  actualizarEstado(): void {
    const inversionInicial = this.miFormulario.value.inversionInicial;
    const inversionProgresiva = this.miFormulario.value.inversionProgresiva;
    const presupuesto = this.miFormulario.value.presupuesto;

    const inversionTotal = inversionInicial + inversionProgresiva;

    if (inversionTotal <= presupuesto) {
      this.miFormulario.patchValue({
        ganancias: presupuesto - inversionTotal,
        perdidas: 0
      });
    } else {
      this.miFormulario.patchValue({
        ganancias: 0,
        perdidas: inversionTotal - presupuesto
      });
    }
  }
}
