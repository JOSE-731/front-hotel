//Url de la api que retorna los hoteles
const url = 'http://127.0.0.1:8000/api/hoteles/';

//Accedemos a los elementos html como tabla, modal, form, y input.

//Tabla
const contenedor = document.querySelector('tbody');
let resultados = '';

//Modal
const modalHabitacion = new bootstrap.Modal(document.getElementById('modalHabitacion'));

//Form y Input
const formHabitacion = document.querySelector('form');
const cantidad = document.getElementById('cantidad');
const tipo_habitacion = document.getElementById('tipo_habitacion');
const acomodacion = document.getElementById('acomodacion');

btnCrear.addEventListener('click', () => {
    //Inicializamos los input a vacio
    cantidad.value = '';
    tipo_habitacion.value = '';
    acomodacion.value = '';
  

    modalHabitacion.show()
    opcion = 'crear'
    
})
