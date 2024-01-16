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
  ingresos: number = 0;
  gastos: number = 0;
  proyecciones: number = 0;
  beneficios: number = 0;
  tipoCampo: string = '';
  tipoCampoEspecifico: string = '';
  campoEspecificoSeleccionado: boolean = false;
  formularios: CampoFormulario[] = [];
  mostrarBotonAgregarCampos: boolean = false;
  camposEspecificos: string[] = [];
  index: number = 0;





  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    // Calendario
    initTE({ Datepicker, Input });

    this.agregarCampo();
    
    this.miFormulario = this.fb.group({
      tipoCampoEspecifico: [''],
      tipoCampo: [''],
      camposIngreso: this.fb.group({
        ingresoTotal: ['', Validators.required],
      }),
      camposGasto: this.fb.group({
        gastosOperativos: ['', Validators.required],
        gastosMarketing: ['', Validators.required],
        gastosDesarrollo: ['', Validators.required],
        gastosAdicionales: [''],
      }),
      fecha: ['', Validators.required],
      ingresos: [{ value: 0, disabled: true }],
      gastos: [{ value: 0, disabled: true }],
      beneficios: [{ value: 0, disabled: true }],
    });


  }


  private generarIdUnico(): string {
    return uuidv4(); // Utiliza la función v4 de uuid para generar IDs únicos
  }

  agregarCampo() {
    const nuevoFormulario: CampoFormulario = { ...this.crearFormulario() };
    this.formularios = [...this.formularios, nuevoFormulario];
  }
  


  private crearFormulario(): CampoFormulario {
    const idUnico = this.generarIdUnico();

    const nuevoFormulario: CampoFormulario = {
      id: idUnico,
      tipoCampo: '',
      tipoCampoEspecifico: '',
      camposIngreso: this.fb.group({
        ingresoTotal: ['', Validators.required],
      }),
      camposGasto: this.fb.group({
        gastosOperativos: ['', Validators.required],
        gastosMarketing: ['', Validators.required],
        gastosDesarrollo: ['', Validators.required],
        gastosAdicionales: [''],
      }),
      fecha: '',
      ingresos: 0,
      gastos: 0,
      beneficios: 0,
    };

    

    return nuevoFormulario;
  }


  

  obtenerNombre(): string {
    return 'Ingrese Valor';
  }



  onTipoCampoChange(event: Event) {
    this.tipoCampo = (event.target as HTMLSelectElement)?.value;
    this.campoEspecificoSeleccionado = false;
    this.mostrarBotonAgregarCampos = false;

    const camposIngreso = this.miFormulario.get('camposIngreso') as FormGroup;
    const camposGasto = this.miFormulario.get('camposGasto') as FormGroup;

    // Establece el valor tanto en el formulario como en el componente
    this.miFormulario.get('tipoCampo')?.setValue(this.tipoCampo);
    this.formularios.forEach(formulario => formulario.tipoCampo = this.tipoCampo);

    if (this.tipoCampo === 'ingreso') {
      camposIngreso.setValidators([Validators.required]);
      camposGasto.setValidators(null);
    } else if (this.tipoCampo === 'gasto') {
      camposGasto.setValidators([Validators.required]);
    } else {
      camposIngreso.setValidators(null);
      camposGasto.setValidators(null);
    }

    camposIngreso.updateValueAndValidity();
    camposGasto.updateValueAndValidity();
  }





  onTipoCampoEspecificoChange(event: any, index: number) {
    const selectedTipoCampoEspecifico = event.target.value;

    this.formularios[index].tipoCampoEspecifico = selectedTipoCampoEspecifico;
    this.campoEspecificoSeleccionado = true;
    this.mostrarBotonAgregarCampos = true;

    // Actualiza solo el FormGroup y el control específico correspondiente
    if (selectedTipoCampoEspecifico === 'ingresoTotal') {
      this.actualizarFormGroupIngreso(index);
    } else if (selectedTipoCampoEspecifico === 'gastosOperativos' || selectedTipoCampoEspecifico === 'gastosMarketing' || selectedTipoCampoEspecifico === 'gastosDesarrollo' || selectedTipoCampoEspecifico === 'gastosAdicionales') {
      this.actualizarFormGroupGasto(index);
    }
  }

  private actualizarFormGroupIngreso(index: number) {
    const camposIngreso = this.formularios[index].camposIngreso;
    if (!camposIngreso) {
      // Crea un nuevo FormGroup para camposIngreso si no existe
      this.formularios[index].camposIngreso = this.fb.group({
        ingresoTotal: ['', Validators.required],
      });
    }
  }

  private actualizarFormGroupGasto(index: number) {
    const camposGasto = this.formularios[index].camposGasto;
    if (!camposGasto) {
      // Crea un nuevo FormGroup para camposGasto si no existe
      this.formularios[index].camposGasto = this.fb.group({
        gastosOperativos: ['', Validators.required],
        gastosMarketing: ['', Validators.required],
        gastosDesarrollo: ['', Validators.required],
        gastosAdicionales: [''],
      });
    }
  }



  getValorControl(formulario: CampoFormulario, grupo: 'camposIngreso' | 'camposGasto', campo: string): FormControl {
    if (formulario && formulario[grupo]) {
      const control = formulario[grupo].get(campo) as FormControl;
  
      if (control) {
        return control;
      }
    }
  
    // Si no existe el control o el FormGroup, lo creamos
    const nuevoControl = this.fb.control(null);
    if (!formulario[grupo]) {
      formulario[grupo] = this.fb.group({});
    }
    formulario[grupo].addControl(campo, nuevoControl);
    return nuevoControl;
  }
  

  getIngeseValorControlIngreso(formulario: CampoFormulario): FormControl {
    const control = this.getValorControl(formulario, 'camposIngreso', 'ingresoTotal');
    console.log('Control de ingreso:', control.value);
    return control;
  }
  
  getIngeseValorControlGastoOperativos(formulario: CampoFormulario): FormControl {
    const control = this.getValorControl(formulario, 'camposGasto', 'gastosOperativos');
    console.log('Control de gastosOperativos:', control.value);
    return control;
  }
  
  getIngeseValorControlGastoMarketing(formulario: CampoFormulario): FormControl {
    const control = this.getValorControl(formulario, 'camposGasto', 'gastosMarketing');
    console.log('Control de gastosMarketing:', control.value);
    return control;
  }
  
  getIngeseValorControlGastoDesarrollo(formulario: CampoFormulario): FormControl {
    const control = this.getValorControl(formulario, 'camposGasto', 'gastosDesarrollo');
    console.log('Control de gastosDesarrollo:', control.value);
    return control;
  }
  
  getIngeseValorControlGastoAdicionales(formulario: CampoFormulario): FormControl {
    const control = this.getValorControl(formulario, 'camposGasto', 'gastosAdicionales');
    console.log('Control de gastosAdicionales:', control.value);
    return control;
  }
  
  


  enviarDatos() {
    let datosAGuardar = this.formularios.map((formulario, index) => {
      // Imprimir los valores actuales de los formularios en la consola para depuración
      console.log(`Datos del formulario ${index}:`, formulario);
      
      let datosFormulario = {
        tipoCampo: formulario.tipoCampo,
        tipoCampoEspecifico: formulario.tipoCampoEspecifico,
        fecha: formulario.fecha,
        ingresos: formulario.camposIngreso?.value?.ingresoTotal, // Asegúrate de que estos nombres coincidan con tus controles
        gastos: formulario.camposGasto?.value?.gastosOperativos, // Asegúrate de que estos nombres coincidan con tus controles
        // Continúa con el resto de los controles de gastos
        beneficios: formulario.beneficios
      };
      
      // Imprimir los datos que se están mapeando para cada formulario
      console.log(`Datos mapeados del formulario ${index}:`, datosFormulario);
  
      return datosFormulario;
    });
  
    // Imprimir el arreglo final de datos que se enviará
    console.log('Datos a guardar:', datosAGuardar);
    
    // Aquí iría la lógica para enviar los datos al backend
    // Ejemplo: this.servicioDeBackend.enviarDatos(datosAGuardar).subscribe(...);
  }
  
  
  





  /*
  enviarDatos(index: number) {
    const tipoCampo = this.formularios[index].tipoCampo;

    if (tipoCampo === 'gasto') {
      this.enviarDatosGasto(index);
    } else if (tipoCampo === 'ingreso') {
      this.enviarDatosIngreso(index);
    }
  }

  private enviarDatosGasto(index: number) {
    const formulario = this.formularios[index].camposGasto;
  
    if (formulario) {
      const datosGasto = {
        'TIPO DE CAMPO': 'GASTO',
        'gastoAdicional': formulario.get('gastosAdicionales')?.value,
        'gastoDesarrollo': formulario.get('gastosDesarrollo')?.value,
        'gastoMarketing': formulario.get('gastosMarketing')?.value,
        'gastoOperativo': formulario.get('gastosOperativos')?.value,
      };
  
      console.log('Datos de Gasto a enviar:', datosGasto);
  
      this.guardarEnMongo(datosGasto);
    } else {
      console.error('El formulario de gastos es nulo o indefinido.');
    }
  }

  private enviarDatosIngreso(index: number) {
    const formulario = this.formularios[index].camposIngreso;
  
    if (formulario) {
      const datosIngreso = {
        'TIPO DE CAMPO': 'INGRESO',
        'ingresoTotal': formulario.get('ingresoTotal')?.value,
      };
  
      console.log('Datos de Ingreso a enviar:', datosIngreso);
  
      this.guardarEnMongo(datosIngreso);
    } else {
      console.error('El formulario de ingresos es nulo o indefinido.');
    }
  }

  private guardarEnMongo(datos: any) {
    this.authService.guardarDatosEnMongo(datos).subscribe(
      respuesta => {
        console.log('Datos guardados en MongoDB:', respuesta);
        // Maneja la respuesta según tus necesidades
      },
      error => {
        console.error('Error al guardar datos en MongoDB:', error);
        // Maneja el error según tus necesidades
      }
    );
  }





  actualizarTotales(): void {
    // Asegúrate de que miFormulario esté inicializado
    if (this.miFormulario) {
      // Calcula y actualiza los totales en tu componente
      this.ingresos = this.calcularTotalIngresos();
      this.gastos = this.calcularTotalGastos();
      this.beneficios = this.calcularBeneficios();
    }
  }
  
  calcularTotalIngresos(): number {
    const ingresoTotalControl = this.miFormulario.get('camposIngreso.ingresoTotal.valor');
    // Verifica que el control no sea nulo antes de acceder a su valor
    return ingresoTotalControl ? Number(ingresoTotalControl.value) || 0 : 0;
  }
  
  calcularTotalGastos(): number {
    const gastosOperativosControl = this.miFormulario.get('camposGasto.gastosOperativos.valor');
    const gastosMarketingControl = this.miFormulario.get('camposGasto.gastosMarketing.valor');
    const gastosDesarrolloControl = this.miFormulario.get('camposGasto.gastosDesarrollo.valor');
    const gastosAdicionalesControl = this.miFormulario.get('camposGasto.gastosAdicionales.valor');
    
    // Verifica que los controles no sean nulos antes de acceder a sus valores
    const totalGastos =
      (gastosOperativosControl ? Number(gastosOperativosControl.value) : 0) +
      (gastosMarketingControl ? Number(gastosMarketingControl.value) : 0) +
      (gastosDesarrolloControl ? Number(gastosDesarrolloControl.value) : 0) +
      (gastosAdicionalesControl ? Number(gastosAdicionalesControl.value) : 0);
  
    return totalGastos || 0;
  }
  
  calcularBeneficios(): number {
    return this.calcularTotalIngresos() - this.calcularTotalGastos();
  }
  */

}