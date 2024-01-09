import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/login.service";

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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.miFormulario = this.fb.group({
      tipoCampo: ['', Validators.required],

      camposIngreso: this.fb.group({
        precioVentaPorUnidad: ['', Validators.required],
        cantidadProyectada: ['', Validators.required],
        ingresosAdicionales: [''],
        costoPorUnidad: ['', Validators.required],
        // ... (otros campos de ingreso)
      }),
      camposGasto: this.fb.group({
        gastosOperativos: ['', Validators.required],
        gastosMarketing: ['', Validators.required],
        gastosDesarrollo: ['', Validators.required],
        gastosAdicionales: [''],
        // ... (otros campos de gasto)
      }),
      fecha: ['', Validators.required],
      ingresos: [{ value: 0, disabled: true }],
      gastos: [{ value: 0, disabled: true }],
      beneficios: [{ value: 0, disabled: true }],
    });
    this.miFormulario.get('tipoCampo')?.valueChanges.subscribe((tipoCampo) => {
      this.onTipoCampoChange(tipoCampo);
    });
  }

  onTipoCampoChange(event: any) {
    const tipoCampo = event.target.value;
    // Oculta o muestra campos según el tipo seleccionado
    const camposIngreso = this.miFormulario.get('camposIngreso');
    const camposGasto = this.miFormulario.get('camposGasto');
  
    // Mostrar u ocultar campos de ingreso
    const camposIngresoElement = document.getElementById('camposIngreso');
    if (camposIngresoElement) {
      camposIngresoElement.style.display = tipoCampo === 'ingreso' ? 'block' : 'none';
    }
  
    // Mostrar u ocultar campos de gasto
    const camposGastoElement = document.getElementById('camposGasto');
    if (camposGastoElement) {
      camposGastoElement.style.display = tipoCampo === 'gasto' ? 'block' : 'none';
    }
  
    if (tipoCampo === 'ingreso') {
      camposIngreso?.enable();
      camposGasto?.disable();
    } else if (tipoCampo === 'gasto') {
      camposIngreso?.disable();
      camposGasto?.enable();
    } else {
      camposIngreso?.disable();
      camposGasto?.disable();
    }
  }
  

  enviarDatos(): void {
    // Obtén los datos del formulario
    const datosFormulario = this.miFormulario.value;

    // Asigna la fecha actual al campo 'fecha'
    datosFormulario.fecha = datosFormulario.fecha;

    // Calcula los valores de ingresos, gastos y beneficios
    const calcularTotalIngresos = () => {
      return (
        (datosFormulario.ingresosAdicionales || 0) +
        datosFormulario.precioVentaPorUnidad * datosFormulario.cantidadProyectada
      );
    };

    const calcularTotalGastos = () => {
      return (
        datosFormulario.costoPorUnidad * datosFormulario.cantidadProyectada +
        datosFormulario.gastosOperativos +
        datosFormulario.gastosMarketing +
        datosFormulario.gastosDesarrollo +
        (datosFormulario.gastosAdicionales || 0)
      );
    };

    const calcularBeneficios = () => {
      return calcularTotalIngresos() - calcularTotalGastos();
    };

    // Actualiza los resultados en el formulario
    this.miFormulario.get('ingresos')?.setValue(calcularTotalIngresos());
    this.miFormulario.get('gastos')?.setValue(calcularTotalGastos());
    this.miFormulario.get('beneficios')?.setValue(calcularBeneficios());

    // Agrega los valores calculados al objeto 'datosFormulario'
    datosFormulario.ingresos = calcularTotalIngresos();
    datosFormulario.gastos = calcularTotalGastos();
    datosFormulario.beneficios = calcularBeneficios();

    // Muestra los datos del formulario en la consola
    console.log('Datos del formulario:', datosFormulario);

    // Realiza la solicitud HTTP para guardar los datos
    this.authService.obtenerDatosDeMongo().subscribe(
      (respuesta) => {
        console.log('Datos obtenidos de MongoDB:', respuesta);
        // Maneja la respuesta según tus necesidades
      },
      (error) => {
        console.error('Error al obtener datos de MongoDB:', error);
        // Maneja el error según tus necesidades
      }
    );

    this.authService.guardarDatosEnMongo(datosFormulario).subscribe(
      (respuesta) => {
        console.log('Datos guardados en MongoDB:', respuesta);
        // Maneja la respuesta según tus necesidades
      },
      (error) => {
        console.error('Error al guardar datos en MongoDB:', error);
        
        // Maneja el error según tus necesidades
      }
    );
  }
}