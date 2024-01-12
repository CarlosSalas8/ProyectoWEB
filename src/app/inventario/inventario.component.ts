import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  opcionesActualesDeProductos: string[] = [];
  datosInventarioApi: any[] = []; 
  opcionesDeEmprendimiento: { [key: string]: string[] } = {

  'Tienda de Ropa' : [
    "Camisetas Personalizadas",
    "Vestidos de Diseño Único",
    "Pantalones y Jeans",
    "Ropa Deportiva",
    "Accesorios de Moda"
  ],
  
  

  'Joyería Artesanal' : [
    "Collares Hechos a Mano",
    "Pulseras de Cuentas",
    "Aretes Artesanales",
    "Anillos Personalizados",
    "Joyas con Piedras Semipreciosas"
  ],

  'Productos de Belleza y Cuidado Personal' : [
    "Jabones Artesanales",
    "Cremas Hidratantes Naturales",
    "Shampoos y Acondicionadores Orgánicos",
    "Maquillaje Ecológico",
    "Aceites Esenciales y Aromaterapia"
  ],

  'Decoración para el Hogar' : [
    "Veladoras y Aromatizantes",
    "Cojines Decorativos",
    "Cuadros y Pinturas",
    "Macetas y Jardinería Urbana",
    "Artículos de Decoración de Temporada"
  ],

  'Alimentos Artesanales' : [
    "Mermeladas y Conservas Caseras",
    "Pan Artesanal y Repostería",
    "Quesos y Embutidos Artesanales",
    "Chocolates y Dulces Gourmet",
    "Salsas y Aderezos Hechos en Casa"
  ],
  'Tienda de Tecnología y Accesorios Electrónicos' : [
    "Fundas para Teléfonos Móviles",
    "Gadgets y Dispositivos Wearables",
    "Accesorios para Computadoras",
    "Altavoces y Auriculares Bluetooth",
    "Cargadores y Baterías Portátiles"
  ],

  'Publicación de Libros y Revistas' : [
    "Libros de Ficción Autoeditados",
    "Revistas Especializadas",
    "Libros de Autoayuda y Desarrollo Personal",
    "Guías y Manuales Educativos",
    "Publicaciones de Poesía y Arte"
  ],

  'Servicios de Diseño y Desarrollo Web' : [
    "Desarrollo de Sitios Web Personalizados",
    "Diseño de Interfaces de Usuario (UI)",
    "Creación de Aplicaciones Móviles",
    "Optimización de Motores de Búsqueda (SEO)",
    "Servicios de Hosting y Mantenimiento Web"
  ],

  'Arte y Manualidades': [
    "Pinturas y Cuadros Originales",
    "Esculturas y Cerámica",
    "Productos de Papelería Creativa",
    "Textiles y Tejidos a Mano",
    "Manualidades y Kits DIY"
  ],

  'Productos Ecológicos y Sostenibles' : [
    "Productos de Limpieza Ecológicos",
    "Ropa y Accesorios Sostenibles",
    "Artículos de Cocina Reutilizables",
    "Productos de Cuidado Personal Sin Plástico",
    "Mobiliario y Decoración Eco-amigable"
  ],
  'Tienda de Juguetes y Productos para Niños' : [
    "Juguetes Educativos de Madera",
    "Ropa y Disfraces para Niños",
    "Libros Infantiles y Juveniles",
    "Juegos de Mesa y Rompecabezas",
    "Artículos de Fiesta y Decoración para Cumpleaños"
  ],

  'Productos de Fitness y Salud' : [
    "Equipos de Entrenamiento en Casa",
    "Suplementos Nutricionales",
    "Ropa Deportiva y Accesorios",
    "Yoga Mats y Equipos de Pilates",
    "Monitores de Actividad y Relojes Inteligentes"
  ],

  'Plataforma de Cursos y Talleres Online' : [
    "Cursos de Desarrollo Personal",
    "Talleres de Arte y Creatividad",
    "Cursos de Marketing y Negocios",
    "Formación en Tecnología y Programación",
    "Clases de Idiomas y Cultura"
  ]};

  tipoEmprendimiento: string | null = null;
  emprendimiento: any = {};
  datosInventario = {
    claseEmprendimiento: '',
    tipoProducto: '',
    cantidad: null,
    precio: null,
    comentario: '',
    emprendimiento: null, 
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarEmprendimiento();
    this.cargarDatosInventario();
  }
onSubmit(form: NgForm) {
    if (form.valid) {
      const datosParaEnviar = {
        claseEmprendimiento: this.datosInventario.claseEmprendimiento,
        tipoProducto: this.datosInventario.tipoProducto,
        cantidad: Number(this.datosInventario.cantidad),
        precio: Number(this.datosInventario.precio),
        comentario: this.datosInventario.comentario,
        emprendimiento: [this.datosInventario.emprendimiento] 
      };
      this.authService.registrarInventario(datosParaEnviar).subscribe(
        (respuesta) => {
          console.log('Datos enviados con éxito:', respuesta);
          this.cargarDatosInventario();
        },
        (error) => {
          console.error('Ocurrió un error al enviar los datos:', error);
        }
      );
    }
  }
  cargarEmprendimiento(): void {
    const userId = this.authService.obtenerIdUsuario();
    if (userId) {
      this.authService.tieneEmprendimientoRegistrado(userId).subscribe(
        emprendimientos => {
          if (emprendimientos && emprendimientos.length > 0) {
            const emprendimiento = emprendimientos[0];
            this.emprendimiento = emprendimiento;
            this.tipoEmprendimiento = emprendimiento.tipoEmprendimiento;
            this.datosInventario.emprendimiento = emprendimiento.id;
            localStorage.setItem('emprendimientoId', emprendimiento.id.toString());

          }
        },
        error => console.error('Error al obtener el emprendimiento:', error)
      );
    }
  }
  actualizarOpcionesDeProductos(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast del EventTarget a HTMLSelectElement
    const valor = selectElement.value; // Obtén el valor seleccionado
    this.opcionesActualesDeProductos = this.opcionesDeEmprendimiento[valor] || []; 
  }
  cargarDatosInventario(): void {
    const emprendimientoId = localStorage.getItem('emprendimientoId'); // Reemplaza esto con el ID real
    if (emprendimientoId) {
      this.authService.obtenerEmprendimiento(emprendimientoId).subscribe(
        (datos) => {
          this.datosInventarioApi = datos;
        },
        (error) => console.error('Error al obtener datos del inventario:', error)
      );
    }
  }
}
