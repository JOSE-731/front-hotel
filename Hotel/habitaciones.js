//Url de la apis que se consumiran
const url = 'http://127.0.0.1:8000/api/habitaciones/';

//Accedemos a los elementos html como tabla, modal, form, y input.

//Tabla
const contenedor = document.querySelector('tbody');

let resultados = '';

//Modal
const modalHabitacion = new bootstrap.Modal(document.getElementById('modalHabitacion'));

//Form y Input
const formHabitacion = document.querySelector('form');
const cantidad = document.getElementById('cantidad');
const  tipo_habitacion = document.getElementById('tipo_habitacion');
const acomodacion = document.getElementById('acomodacion');
const id_hotel = document.getElementById("id_hotel");

//Obtener parametro, obtenemos el id del hotel del cual se mostraran las habitaciones que le pertenecen
const valores = window.location.search;

//Limpiamos el valor que obtenemos
const newValor = valores.substring(1);


btnCrear.addEventListener('click', () => {
   
    modalHabitacion.show()
    opcion = 'crear'
    
})



console.log(id_hotel.value = newValor);

//Mostar data de habitaciones
const mostrar = (hotel) => {

    //Filtramos las habitaciones segun el id del hotel
    const datafiltere =  hotel.filter(p => p.id_hotel == newValor);
 

    datafiltere.forEach(articulo => {
        
        resultados += `
        <tr> 
        <td>${articulo.id}</td>
        <td>${articulo.cantidad}</td>
        <td>${articulo.tipo_habitacion}</td>
        <td>${articulo.acomodacion}</td>
        <td class"text-center"><a class = "btnEliminar btn btn-danger mr-2" >Eliminar</a></a></td>
        </tr>
        `
    });
    
    contenedor.innerHTML = resultados;
}


//Consumiendo la api de habitaciones
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
    formHabitacion.addEventListener('submit', (e)=>{
        e.preventDefault()

        if(opcion=='crear'){        
    
            //console.log('OPCION CREAR')
            fetch(url, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    cantidad:cantidad.value,
                    tipo_habitacion:tipo_habitacion.value,
                    acomodacion:acomodacion.value,
                    id_hotel: id_hotel.value 
                })
            })
            .then( response => response.json() )
            .then( data => {
                const nuevoArticulo = []
                nuevoArticulo.push(data)
                mostrar(nuevoArticulo)
            })
        }
        modalHabitacion.hide()
    })

