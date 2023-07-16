
/*const ecommerce = document.getElementById('titulo');
ecommerce.style.background='pink';
ecommerce.style.font='bold ';*/


//cartas
const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorNuevo = document.getElementById('contenedorNuevo');
let carro = JSON.parse(localStorage.getItem('carro')) || []; //operador de asignacion condicional 


formNuevoUsuario();

function nuevoRenderizarProducto(productos) {
    //VACIAR CONTENEDOR
    contenedorNuevo.innerHTML = '';

    //cargamos la carta de los productos renderizados
    for (const producto of productos) {
        contenedorNuevo.innerHTML +=
            `
        <div class="col mb-3">
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src=${producto.foto}" alt="...">
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <!-- Product price-->
                        $${producto.precio}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a id=${producto.id} class="btn btn-outline-dark mt-auto compra">Comprar</a></div>
                </div>
            </div>
        </div>`
    }

    //eventos
    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {

        boton.addEventListener('click', () => {
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            //cargar productos al carro
            agregarACarrito(prodACarro);
        })
        boton.onmouseover = () => {
            boton.classList.replace('btn-secondary', 'btn-warning');
        }
        boton.onmouseout = () => {
            boton.classList.replace('btn-warning', 'btn-secondary');
        }
    }
}

nuevoRenderizarProducto(productos);

let total = carro.reduce((ac, prod) => ac + prod.total, 0);
//sumando los productos 
document.getElementById('total').innerText = `Total a pagar $:${total}`;
for (const producto of carro) {
    tablabody.innerHTML += `
    <tr>
        <td>${producto.cant}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.total}</td>
        
        </tr>

    `;
}

let cant = 0;

function agregarACarrito(productoAgregar) {

    if (carro.includes(productoAgregar)) {
        carro.map((producto, i) => {
            if (producto.id === productoAgregar.id) {
                carro[i].cant = carro[i].cant + 1;
                carro[i].total = carro[i].total + productoAgregar.precio;
            }
        })
    } else {
        productoAgregar.cant = 1;
        productoAgregar.total = productoAgregar.precio
        carro.push(productoAgregar);
    }

    //sweet alert
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: `Tu producto ${productoAgregar.nombre} se agregó al carrito`,
        showConfirmButton: false,
        timer: 1500
    })

    //calculo
    let total = carro.reduce((ac, prod) => ac + prod.total, 0);
    //sumando los productos 
    document.getElementById('total').innerText = `Total a pagar $:${total}`;
    //storage
    localStorage.setItem('carro', JSON.stringify(carro));

    tablabody.innerHTML = ''
    for (const producto of carro) {
        tablabody.innerHTML += `
        <tr>
            <td>${producto.cant}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.total}</td>
            
            </tr>
        `;
    }
}

function formNuevoUsuario() {
    let nombre = document.getElementById('nombre');
    nombre.onkeyup = () => {
        if (nombre.value.length < 3) {
            console.log('nombre de menos de 3 caracteres');
            nombre.style.color = 'red';
        } else {
            nombre.style.color = 'black';
        }
    }

    let email = document.getElementById('email');
    email.addEventListener('input', () => {
        if (!email.value.includes('@') || !email.value.includes('.')) {
            document.getElementById('mensaje').innerText = 'No olvides el @'
        } else {
            document.getElementById('mensaje').innerText = '';
        }


    })

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', validar);

    function validar(ev) {

        console.log('entro a validar');
        ev.preventDefault();
        if ((nombre.value == '') || (email.value == '')) {

            //alert('Ingrese nombre o email valido !');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese nombre o email valido !!'

            })
        } else {
            console.log('else');
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })

            nombre.value = "";
            email.value = "";
        }
    }

}



//boton comprar 
const verCarrito = document.getElementById('verCarrito');

verCarrito.addEventListener('click', () => {

})

const botonCancelar = document.getElementById('botonCancelar');

botonCancelar.addEventListener('click', () => {

    localStorage.clear();
    localStorage.removeItem('carro');
    carro = [];
    tablabody.innerHTML = "";
    document.getElementById('total').innerText = `Total a pagar $:0`;
});

