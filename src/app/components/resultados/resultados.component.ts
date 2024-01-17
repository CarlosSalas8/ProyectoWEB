import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { startOfDay, subMonths, isSameMonth } from 'date-fns';
import { AuthService } from "../../services/login.service";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { initFlowbite } from 'flowbite';
export type ChartOptions = {
  series?: ApexAxisChartSeries[];
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
};
interface AcumuladoPorFecha {
  ingresoTotal: number;
  gastoTotal: number;
  beneficiosTotal: number;
}
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  totalIngresosMesActual = 0;
  totalGastosMesActual = 0;
  beneficiosMesActual = 0;
  comparacionIngresos = { aumento: false, porcentaje: 0 };
  comparacionGastos = { aumento: false, porcentaje: 0 };
  comparacionBeneficios = { aumento: false, porcentaje: 0 };
  datosDeMongo: any[] = [];
  datosPaginados: any[] = [];
  datosFiltrados: any[] = [];

  @ViewChild("chart1")
  chart1!: ChartComponent;
  @ViewChild("chart2")
  chart2!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;


  constructor(private authService: AuthService) {
    this.chartOptions1 = {
      series: [
        {
           name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };

    this.chartOptions2 = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };

   
  }
  ngOnInit(): void {
    this.obtenerTodosLosDatos();
    initFlowbite();
  }
  obtenerTodosLosDatos() {
    this.authService.obtenerDatosDeMongo().subscribe(data => {
      console.log('Datos obtenidos:', data);
      this.datosDeMongo = data;
      this.calculoDeTotales();
      this.procesarDatosParaGrafica(data); // Llama al nuevo método aquí

    });
  }
  calculoDeTotales() {
    const hoy = startOfDay(new Date());
    const mesAnterior = subMonths(hoy, 1);
  
    let totalIngresosMesAnterior = 0;
    let totalGastosMesAnterior = 0;
  
    this.datosDeMongo.forEach(dato => {
      const fechaDato = new Date(dato.fecha);
  
      if (isSameMonth(fechaDato, hoy)) {
        // Convertir a número antes de sumar
        this.totalIngresosMesActual += Number(dato.ingresoTotal);
        this.totalGastosMesActual += Number(dato.gastoTotal);
        console.log('totalIngresosMesActual', this.totalIngresosMesActual);
        console.log('totalGastosMesActual', this.totalGastosMesActual);
      } else if (isSameMonth(fechaDato, mesAnterior)) {
        // Convertir a número antes de sumar
        totalIngresosMesAnterior += Number(dato.ingresoTotal);
        totalGastosMesAnterior += Number(dato.gastoTotal);
        console.log('totalIngresosMesAnterior', totalIngresosMesAnterior);
        console.log('totalGastosMesAnterior', totalGastosMesAnterior);
      }
    });
  
    this.beneficiosMesActual = this.totalIngresosMesActual - this.totalGastosMesActual;
    console.log('BENEDICIOSMESACTUAL',this.beneficiosMesActual);
    // Calcula la comparación con el mes anterior
    this.comparacionIngresos = this.calcularComparacion(this.totalIngresosMesActual, totalIngresosMesAnterior);
    this.comparacionGastos = this.calcularComparacion(this.totalGastosMesActual, totalGastosMesAnterior);
    this.comparacionBeneficios = this.calcularComparacion(this.beneficiosMesActual, totalIngresosMesAnterior - totalGastosMesAnterior);
    console.log('BENEDICIOSCOMPA',this.comparacionBeneficios);

  }

  calcularComparacion(valorActual: number, valorAnterior: number) {
    const aumento = valorActual > valorAnterior;
    const cambio = aumento ? (valorActual - valorAnterior) : (valorAnterior - valorActual);
    const porcentaje = (cambio / valorAnterior) * 100;
    console.log('aumente',aumento)
    console.log('cambio',cambio)
    console.log('porcentaje',porcentaje)

    return { aumento, porcentaje: isNaN(porcentaje) ? 0 : porcentaje };
  }
procesarDatosParaGrafica(datos: any[]) {
  // Objeto para acumular los totales por mes y año.
  const acumuladosPorFecha: { [fecha: string]: AcumuladoPorFecha } = {};

  datos.forEach(dato => {
    const fecha = new Date(dato.fecha);
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const claveFecha = `${mes}-${anio}`;

    if (!acumuladosPorFecha[claveFecha]) {
      acumuladosPorFecha[claveFecha] = {
        ingresoTotal: 0,
        gastoTotal: 0,
        beneficiosTotal: 0
      };
    }

    acumuladosPorFecha[claveFecha].ingresoTotal += Number(dato.ingresoTotal);
    acumuladosPorFecha[claveFecha].gastoTotal += Number(dato.gastoTotal);
    acumuladosPorFecha[claveFecha].beneficiosTotal += Number(dato.beneficiosTotal);
  });

  const fechasOrdenadas = Object.keys(acumuladosPorFecha).sort((a, b) => {
    const [mesA, anioA] = a.split('-').map(Number);
    const [mesB, anioB] = b.split('-').map(Number);
    return new Date(anioA, mesA - 1).getTime() - new Date(anioB, mesB - 1).getTime();
  });

  const ingresosData: number[] = [];
  const gastosData: number[] = [];
  const beneficiosData: number[] = [];
  const categorias: string[] = [];

  fechasOrdenadas.forEach(claveFecha => {
    categorias.push(claveFecha);
    ingresosData.push(acumuladosPorFecha[claveFecha].ingresoTotal);
    gastosData.push(acumuladosPorFecha[claveFecha].gastoTotal);
    beneficiosData.push(acumuladosPorFecha[claveFecha].beneficiosTotal);
  });
    
    
    this.chartOptions4 = {
      color:['#F17777', '#F17777', '#F17777'],
      series: [
        {
          name: "Ingreso",
          type: "column",
          data: ingresosData,
          color: '#ffd60a'
        },
        {
          name: "Gasto",
          type: "column",
          data: gastosData,
          color: '#003566'
          
        },
        {
          name: "Beneficio",
          type: "line",
          data: beneficiosData,
          color: '#001d3d'

        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: "Grafica de analisis de resultados - Gastos e ingresos",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: categorias
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396"
            }
          }
        },
        
      ]
    };
    const totalIngresos = ingresosData.reduce((acc, curr) => acc + curr, 0);
    const totalGastos = gastosData.reduce((acc, curr) => acc + curr, 0);
    const totalBeneficios = beneficiosData.reduce((acc, curr) => acc + curr, 0);

    this.chartOptions3 = {
      series: [totalIngresos, totalGastos, totalBeneficios],
      
      chart: {
        width: 380,
        type: "pie"
      },
      colors:['#ffd60a','#003566','#001d3d'],
      labels: ["Ingresos", "Gastos", "Beneficios"],
      legend: {
        position: 'top', // Cambiar la posición de la leyenda a 'top'
        horizontalAlign: 'center', // Opciones: 'left', 'center', 'right'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
