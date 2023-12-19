import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  miFormulario!: FormGroup;
  ingresos: number = 0;
  gastos: number = 0;
  proyecciones: number = 0;
  beneficios: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.miFormulario = this.fb.group({
      precioVentaPorUnidad: ['', Validators.required],
      cantidadProyectada: ['', Validators.required],
      ingresosAdicionales: [''],
      costoPorUnidad: ['', Validators.required],
      gastosOperativos: ['', Validators.required],
      gastosMarketing: ['', Validators.required],
      gastosDesarrollo: ['', Validators.required],
      tasaCrecimiento: ['', Validators.required],
      duracionProyeccion: ['', Validators.required],

      gastosAdicionales: [''],
      ingresos: [{ value: 0, disabled: true }],
      gastos: [{ value: 0, disabled: true }],
      proyecciones: [{ value: 0, disabled: true }],
      beneficios: [{ value: 0, disabled: true }],
    });
  }

  // Función para actualizar automáticamente ingresos, gastos, proyecciones, beneficios
  actualizarEstado(): void {
    const emprendimiento = this.miFormulario.value;

    const calcularTotalIngresos = () => {
      return (
        (emprendimiento.ingresosAdicionales || 0) +
        emprendimiento.precioVentaPorUnidad * emprendimiento.cantidadProyectada
      );
    };

    const calcularTotalGastos = () => {
      return (
        emprendimiento.costoPorUnidad * emprendimiento.cantidadProyectada +
        emprendimiento.gastosOperativos +
        emprendimiento.gastosMarketing +
        emprendimiento.gastosDesarrollo +
        (emprendimiento.gastosAdicionales || 0)
      );
    };

    const calcularProyecciones = () => {
      let ingresosProyectados = this.miFormulario.get('ingresos')?.value || 0;
      let gastosProyectados = this.miFormulario.get('gastos')?.value || 0;
    
      for (let i = 0; i < emprendimiento.duracionProyeccion; i++) {
        ingresosProyectados *= 1 + emprendimiento.tasaCrecimiento;
        gastosProyectados *= 1 + emprendimiento.tasaCrecimiento;
      }
    
      // Limitar a 7 dígitos decimales y convertir a cadena de texto
      return (ingresosProyectados - gastosProyectados).toFixed(7);
    };
    

    const calcularBeneficios = () => {
      return calcularTotalIngresos() - calcularTotalGastos();
    };

    // Actualiza los resultados en el formulario
    this.miFormulario.get('ingresos')?.setValue(calcularTotalIngresos());
    this.miFormulario.get('gastos')?.setValue(calcularTotalGastos());
    this.miFormulario.get('proyecciones')?.setValue(calcularProyecciones());
    this.miFormulario.get('beneficios')?.setValue(calcularBeneficios());
  }
}