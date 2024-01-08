import { Component } from '@angular/core';
import { AuthService } from "../../services/login.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.component.html',
  styleUrls: ['./registro-datos.component.css']
})

export class RegistroDatosComponent {

miFormulario!: FormGroup;
ingresos: number = 0;
gastos: number = 0;
proyecciones: number = 0;
beneficios: number = 0;

constructor(private fb: FormBuilder, private authService: AuthService) { }
datosDeMongo: any;

ngOnInit() {
  this.miFormulario = this.fb.group({
    precioVentaPorUnidad: ['', Validators.required],
    cantidadProyectada: ['', Validators.required],
    ingresosAdicionales: [''],
    costoPorUnidad: ['', Validators.required],
    gastosOperativos: ['', Validators.required],
    gastosMarketing: ['', Validators.required],
    gastosDesarrollo: ['', Validators.required],
    gastosAdicionales: [''],
    fecha: ['', Validators.required],
    ingresos: [{ value: 0, disabled: true }],
    gastos: [{ value: 0, disabled: true }],
    beneficios: [{ value: 0, disabled: true }],
  });
}

enviarDatos(): void {
  // Obtén los datos del formulario
  const datosFormulario = this.miFormulario.value;
  const idUsuario = this.authService.obtenerIdUsuario();

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
  if(idUsuario) {
    datosFormulario.usuario = [parseInt(idUsuario)];
  } else {
    datosFormulario.usuario = 1;
  }
  // Muestra los datos del formulario en la consola
  console.log('Datos del formulario:', datosFormulario);
  console.log('Datos del usuario:', idUsuario);
  // Realiza la solicitud HTTP para guardar los datos
  this.authService.obtenerDatosDeMongo().subscribe(data => {
    this.datosDeMongo = data;
  });

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
