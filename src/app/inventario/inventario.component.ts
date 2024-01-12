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
    emprendimiento: [] // Aquí iría el ID de emprendimiento si es necesario
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarEmprendimiento();
    this.obtenerEmprendimiento();
  }
  obtenerEmprendimiento() {
    const userId = this.authService.obtenerIdUsuario() || ''; // Set a default empty string if userId is null
    
    this.authService.tieneEmprendimientoRegistrado(userId).subscribe(
      emprendimiento => {
        if (emprendimiento && emprendimiento.length > 0) {
          this.datosInventario.emprendimiento = emprendimiento[0].id;
        }
      },
      error => {
        console.error('Error al obtener el emprendimiento:', error);
      }
    );
  }
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Enviando datos:', this.datosInventario);
      this.authService.registrarInventario(this.datosInventario).subscribe(
        (respuesta) => {
          console.log('Datos enviados con éxito:', respuesta);
          // Aquí puedes manejar la respuesta exitosa, como cerrar el modal o mostrar un mensaje
        },
        (error) => {
          console.error('Ocurrió un error al enviar los datos:', error);
          if (error.error && error.error.detail) {
            console.error('Detalle del error:', error.error.detail);
          }
        }
      );
    }
  }

  cargarEmprendimiento(): void {
    const userId = this.authService.obtenerIdUsuario();
    if (userId) {
      this.authService.tieneEmprendimientoRegistrado(userId).subscribe(
        data => {
          // Asumiendo que la API devuelve un array y tomamos el primer elemento
          this.emprendimiento = data[0];
          this.tipoEmprendimiento = this.emprendimiento.tipoEmprendimiento; // esto determinará qué select se muestra

        },
        error => {
          console.error('Error al obtener el emprendimiento', error);
        }
      );
    }
  }
  actualizarOpcionesDeProductos(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast del EventTarget a HTMLSelectElement
    const valor = selectElement.value; // Obtén el valor seleccionado
  
    // Actualiza las opciones del segundo select basado en el valor del primero
    this.opcionesActualesDeProductos = this.opcionesDeEmprendimiento[valor] || [];
  
    // Si el valor no coincide con ninguna clave, puedes manejar un caso por defecto o dejar el array vacío
  }

}
