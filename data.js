//Prepárando la data que se consultará

//Url de la api que retorna los hoteles
const url = 'http://127.0.0.1:8000/api/hoteles/';

//Accedemos a los elementos html como tabla, modal, form, y input.

//Tabla
const contenedor = document.querySelector('tbody');
let resultados = '';

//Modal
const modalHotel = new bootstrap.Modal(document.getElementById('modalHotel'));

//Form y Input
const formHotel = document.querySelector('form');
const nombre = document.getElementById('nombre');
const ciudad = document.getElementById('ciudad');
const direccion = document.getElementById('direccion');
const nit = document.getElementById('nit');
const numero_habitaciones = document.getElementById('numero_habitaciones');

var opcion = ''

//Funcion para abrir el modal

btnCrear.addEventListener('click', () => {
    //Inicializamos los input a vacio
    nombre.value = '';
    ciudad.value = '';
    direccion.value = '';
    nit.value = '';
    numero_habitaciones.value = '';

    modalHotel.show()
    opcion = 'crear'
    
})

//Mostar data
const mostrar = (hotel) => {
    hotel.forEach(articulo => {

        resultados += `
                         <tr> 
                           <td>${articulo.id}</td>
                           <td>${articulo.nombre}</td>
                           <td>${articulo.ciudad}</td>
                           <td>${articulo.direccion}</td>
                           <td>${articulo.nit}</td>
                           <td>${articulo.numero_habitaciones}</td>
                           <td class"text-center"><a class = "btnEliminar btn btn-danger mr-2" >Eliminar</a><a class = "btnVer btn btn-primary" href="habitaciones.html?${articulo.id}">Ver tipo habitacion</a></td>
                         </tr>
                        `
    });

    contenedor.innerHTML = resultados;
}


//Consumiendo la api
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


//Eliminar hotel
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

on(document, 'click', '.btnEliminar', e => {
    //Capturamos toda la fila y el id
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML


    function data() {
        fetch(url + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    data();
})


//Guardar
formHotel.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                ciudad:ciudad.value,
                direccion:direccion.value,
                nit:nit.value,
                numero_habitaciones:numero_habitaciones.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalHotel.hide()
})