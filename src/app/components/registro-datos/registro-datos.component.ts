import { Component, OnInit,AfterViewInit,ElementRef,ChangeDetectorRef   } from '@angular/core';
import { AuthService } from "../../services/login.service";
import { startOfDay, subWeeks, subMonths, subYears } from 'date-fns';
import { initFlowbite } from 'flowbite';
import { Flowbite } from 'src/app/services/flowbite-init.service';
import { FlowbiteService } from 'src/app/services/flowbite-init.service';
@Flowbite()
@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.component.html',
  styleUrls: ['./registro-datos.component.css']
})
export class RegistroDatosComponent implements OnInit{
  datosDeMongo: any[] = [];
  datosPaginados: any[] = [];
  datosFiltrados: any[] = [];
  paginaActual: number = 1;
  totalDeDatos: number = 1;
  datosPorPagina: number = 6;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaHasta: Date = new Date();
  datosParaModal: any[] = [];

  constructor(private authService: AuthService,private cdr: ChangeDetectorRef,
    private flowbiteService: FlowbiteService) {
   }
  estado: any = {};
  ngOnInit() {
    this.obtenerTodosLosDatos();
    this.flowbiteService.initialize();
    initFlowbite();

  }
  obtenerTodosLosDatos() {
    this.authService.obtenerDatosDeMongo().subscribe(data => {
      console.log('Datos obtenidos:', data);
      this.datosDeMongo = data;
      this.datosFiltrados = [...this.datosDeMongo]; // Inicialmente no hay filtro
      this.totalDeDatos = this.datosFiltrados.length;
      console.log('Total de datos sin filtro:', this.totalDeDatos);
      this.paginaActual = 1;
      this.cargarDatosDePagina(this.paginaActual);
    });
  }
  
  seleccionarFiltro(tiempo: string) {
    console.log('Filtrando por:', tiempo);
    if (tiempo === 'all') {
      this.quitarFiltros();
    } else {
      const hoy = startOfDay(new Date());
      let fechaDesde;
      let fechaHasta = hoy; // Incluye el día actual hasta el final del día
      
      switch (tiempo) {
        case 'day':
          fechaDesde = hoy;
          break;
        case 'week':
          fechaDesde = subWeeks(hoy, 1);
          break;
        case 'month':
          fechaDesde = subMonths(hoy, 1);
          break;
        case 'year':
          fechaDesde = subYears(hoy, 1);
          break;
        default:
          fechaDesde = null;
          fechaHasta = hoy;
      }
      console.log('Filtrando desde:', fechaDesde, 'hasta:', fechaHasta);  
this.filtrarDatos(fechaDesde, fechaHasta);
    }
  }
  
  filtrarDatos(fechaDesde: Date | null, fechaHasta: Date | null) {
    if (fechaDesde && fechaHasta) {
      this.datosFiltrados = this.datosDeMongo.filter(dato => {
        const fechaDato = new Date(dato.fecha);
        return fechaDato >= fechaDesde && fechaDato <= fechaHasta;
      });
    } else {
      // Si no hay fechas definidas, no aplicar filtro
      this.datosFiltrados = [...this.datosDeMongo];
    }
    this.totalDeDatos = this.datosFiltrados.length;
    this.paginaActual = 1;
    this.cargarDatosDePagina(this.paginaActual);
  }
  
  cargarDatosDePagina(pagina: number) {
    const inicio = (pagina - 1) * this.datosPorPagina;
    const fin = inicio + this.datosPorPagina;
    this.datosPaginados = this.datosFiltrados.slice(inicio, fin);
    console.log('Datos de la página actual:', this.datosPaginados);
  }



  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cargarDatosDePagina(this.paginaActual - 1);
    }
  }
  
  paginaSiguiente(): void {
    if (this.paginaActual < Math.ceil(this.totalDeDatos / this.datosPorPagina)) {
      this.cargarDatosDePagina(this.paginaActual + 1);
    }
  }
  
  totalPaginas(): number {
    return Math.ceil(this.totalDeDatos / this.datosPorPagina);
  }
  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas()) {
      this.cargarDatosDePagina(nuevaPagina);
    }
  }
  getArrayFromNumber(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

  quitarFiltros() {
    this.datosFiltrados = [...this.datosDeMongo];
    this.totalDeDatos = this.datosFiltrados.length;
    this.paginaActual = 1;
    this.cargarDatosDePagina(this.paginaActual);
    console.log('Filtros quitados, mostrando todos los datos');
  }
  obtenerTiposIngresos(ingresos: any[]): string {
    return ingresos.map(ingreso => `${ingreso.tipo}: ${ingreso.valor}`).join(', ');
  }
  
  obtenerTiposGastos(gastos: any[]): string {
    return gastos.map(gasto => `${gasto.tipo}: ${gasto.valor}`).join(', ');
  }
  abrirModalConDatos(tipo: 'ingresos' | 'gastos', datos: any[]): void {
    this.datosParaModal = datos;
    console.log('Datos para modal:', this.datosParaModal);
  }
}


