import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/login.service";
import { Datepicker, Input, initTE } from 'tw-elements';
import { FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
interface CampoFormulario {
  id: string;
  tipoCampoEspecifico: string;
  camposIngreso: FormGroup;
  camposGasto: FormGroup;
  fecha: string;
  ingresos: number;
  gastos: number;
  beneficios: number;
  tipoCampo: string;
}

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  miFormulario!: FormGroup;

  ingresosTotal: number[] = [];
  gastosTotal: number[] = [];
  beneficiosTotal: number[] = [];


  contadorIngresoNegocio: number = 0;
  sumaIngresoNegocio: number = 0;

  contadorGastoMantenimiento: number = 0;
  sumaGastoMantenimiento: number = 0;

  contadorGastosMarketing: number = 0;
  sumaGastosMarketing: number = 0;

  contadorGastoSalario: number = 0;
  sumaGastoSalario: number = 0;

  contadorGastosServicios: number = 0;
  sumaGastosServicios: number = 0;

  constructor(private fb: FormBuilder, private authService: AuthService) { }




  ngOnInit() {
    initTE({ Datepicker, Input });
    this.miFormulario = this.fb.group({
      ingresoNegocio: ['', Validators.required],
      gastoMantenimiento: ['', Validators.required],
      gastosMarketing: ['', Validators.required],
      gastoSalario: ['', Validators.required],
      gastosServicios: [''],
      fecha: ['', Validators.required],
      ingresosTotal: [{ value: 0, disabled: true }],
      gastosTotal: [{ value: 0, disabled: true }],
      beneficiosTotal: [{ value: 0, disabled: true }],
      inputDeshabilitado: [{ value: '0', disabled: true }] 
    });
    // Ingresos
    this.miFormulario.get('ingresoNegocio')?.valueChanges.subscribe((value: string) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        // No actualizar el contador automáticamente, solo al presionar "Enter"
      }
    });

    // Gasto de Mantenimiento
    this.miFormulario.get('gastoMantenimiento')?.valueChanges.subscribe((value: string) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        // No actualizar el contador automáticamente, solo al presionar "Enter"
      }
    });

    // Gastos de Marketing
    this.miFormulario.get('gastosMarketing')?.valueChanges.subscribe((value: string) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        // No actualizar el contador automáticamente, solo al presionar "Enter"
      }
    });

    // Gasto Salario
    this.miFormulario.get('gastoSalario')?.valueChanges.subscribe((value: string) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        // No actualizar el contador automáticamente, solo al presionar "Enter"
      }
    });

    // Gastos de Servicios
    this.miFormulario.get('gastosServicios')?.valueChanges.subscribe((value: string) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        // No actualizar el contador automáticamente, solo al presionar "Enter"
      }
    });
  }

  





  onEnter(fieldName: string) {
    const fieldValue = this.miFormulario.get(fieldName)?.value;
    const parsedValue = parseFloat(fieldValue);
    if (!isNaN(parsedValue)) {
      switch (fieldName) {
        case 'ingresoNegocio':
          this.sumaIngresoNegocio += parsedValue;
          this.contadorIngresoNegocio = this.sumaIngresoNegocio;
          this.miFormulario.get('ingresosTotal')?.setValue(this.contadorIngresoNegocio);
          this.miFormulario.get(fieldName)?.setValue(''); // Limpiar el campo después de ingresar el valor
          break;
        // Repite lo mismo para los demás campos
        case 'gastoMantenimiento':
          this.sumaGastoMantenimiento += parsedValue;
          this.contadorGastoMantenimiento = this.sumaGastoMantenimiento;
          this.miFormulario.get('gastosTotal')?.setValue(this.contadorGastoMantenimiento);
          this.miFormulario.get(fieldName)?.setValue('');
          break;
        case 'gastosMarketing':
          this.sumaGastosMarketing += parsedValue;
          this.contadorGastosMarketing = this.sumaGastosMarketing;
          this.miFormulario.get('gastosTotal')?.setValue(this.contadorGastosMarketing);
          this.miFormulario.get(fieldName)?.setValue('');
          break;
        case 'gastoSalario':
          this.sumaGastoSalario += parsedValue;
          this.contadorGastoSalario = this.sumaGastoSalario;
          this.miFormulario.get('gastosTotal')?.setValue(this.contadorGastoSalario);
          this.miFormulario.get(fieldName)?.setValue('');
          break;
        case 'gastosServicios':
          this.sumaGastosServicios += parsedValue;
          this.contadorGastosServicios = this.sumaGastosServicios;
          this.miFormulario.get('gastosTotal')?.setValue(this.contadorGastosServicios);
          this.miFormulario.get(fieldName)?.setValue('');
          break;
        default:
          break;
      }
    }
  }






  calcularTotales(): void {
    // Obtén los datos del formulario
    const datosFormulario = this.miFormulario.value;

    // Calcula los valores de ingresos, gastos y beneficios
    const calcularTotalIngresos = () => {
      return (
        this.contadorIngresoNegocio
      );
    };

    const calcularTotalGastos = () => {
      return (
        this.contadorGastoMantenimiento + this.contadorGastoSalario + this.contadorGastosMarketing + this.contadorGastosServicios
      );
    };

    const calcularBeneficios = () => {
      return calcularTotalIngresos() - calcularTotalGastos();
    };

    // Actualiza los resultados en el formulario
    this.miFormulario.get('ingresosTotal')?.setValue(calcularTotalIngresos());
    this.miFormulario.get('gastosTotal')?.setValue(calcularTotalGastos());
    this.miFormulario.get('beneficiosTotal')?.setValue(calcularBeneficios());

    // Agrega los valores calculados al objeto 'datosFormulario'
    datosFormulario.ingresosTotal = calcularTotalIngresos();
    datosFormulario.gastosTotal = calcularTotalGastos();
    datosFormulario.beneficiosTotal = calcularBeneficios();
  }



  VisualizarDatos(): void {
    // Llama al método para calcular los totales
    this.calcularTotales();
  
    // Obtén los datos del formulario después de los cálculos
    const datosFormulario = this.miFormulario.value;
  
    // Asigna la fecha actual al campo 'fecha'
    datosFormulario.fecha = datosFormulario.fecha;
  
    const datosAEnviar = this.construirDatosAEnviar(datosFormulario);
  
    console.log('Datos a enviar:', datosAEnviar);
    // Llama a enviarBase para enviar y obtener datos de MongoDB
  }
  
  enviarDatos(datosFormulario: any): void {
   
    // Construye la estructura de datos a enviar
    const datosAEnviar = {
      ...this.construirDatosAEnviar(datosFormulario) // La API espera una lista de IDs
    };
  
    // Guarda los datos en MongoDB
    this.authService.guardarDatosEnMongo(datosAEnviar).subscribe(
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
  
 
  private construirDatosAEnviar(datosFormulario: any): any {
    const usuarioId = this.authService.obtenerIdUsuario();
    const emprendimientoId = this.authService.obtenerIdEmprendimiento();
    console.log(usuarioId)
    console.log(emprendimientoId)
    if (!datosFormulario) {
      console.error('Los datos del formulario son nulos o indefinidos.');
      return null;
    }
  
    // Asegúrate de que la fecha esté en el formato correcto (YYYY-MM-DD)
      const fecha = new Date(datosFormulario.fecha);
      const fechaFormatoCorrecto = fecha.getFullYear() + '-' +
                               ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' +
                               ('0' + fecha.getDate()).slice(-2); // Modifica esto según cómo estés manejando las fechas
        console.log(fechaFormatoCorrecto) // Modifica esto según cómo estés manejando las fechas

    // Construye el objeto con la estructura deseada para tu API Django
    return {
      ingresos: [
        { tipo: 'Ingreso de Negocio', valor: this.contadorGastoSalario }, // Asegúrate de que estos valores sean correctos
      ],
      gastos: [
        { tipo: 'Gastos de Mantenimiento', valor: this.contadorGastoMantenimiento },
        { tipo: 'Gastos de Salario', valor: this.contadorGastoSalario },
        { tipo: 'Gastos de Marketing', valor: this.contadorGastosMarketing },
        { tipo: 'Gastos de Servicios', valor: this.contadorGastosServicios },
        // Agrega más objetos según sea necesario
      ],
      ingresoTotal: this.miFormulario.get('ingresosTotal')?.value ,
      gastoTotal: this.miFormulario.get('gastosTotal')?.value ,
      beneficiosTotal: this.miFormulario.get('beneficiosTotal')?.value ,
      fecha: fechaFormatoCorrecto,
      usuario: [usuarioId],
      emprendimiento: [emprendimientoId]
    };
  }



}