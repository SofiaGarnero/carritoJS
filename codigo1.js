
const ecommerce = document.getElementById('titulo');
ecommerce.style.background='pink';
ecommerce.style.font='bold ';


//cartas
const contenedorProductos = document.getElementById('contenedorProductos');
const carro = JSON.parse(localStorage.getItem('carro')) || []; //operador de asignacion condicional 

//dom
function renderizarProducto(productos) {
    //VACIAR CONTENEDOR
    contenedorProductos.innerHTML = '';

    //cargamos la carta de los productos renderizados


    for (const producto of productos) {
        contenedorProductos.innerHTML += `
        <div class="card col-sm-2 ">
            <img class="card-img-top"  src=${producto.foto} alt="Card image cap">
            <div class="card ">
                <h5 class="card-title">${producto.nombre} </h5>
                <p class="card-text">$ ${producto.precio}</p>
                <button id=${producto.id} class="btn btn-secondary compra">comprar</button>
            </div>  
        </div>`;
    }

    //eventos
    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {

        boton.addEventListener('click', () => {
            // console.log('hiciste click en:'+ boton.id);
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            console.log(prodACarro);

            //cargar productos al carro
            agregarACarrito(prodACarro);

        })
  

        boton.onmouseover =() => {
            boton.classList.replace('btn-secondary','btn-warning');
        }
        boton.onmouseout =() => {
            boton.classList.replace('btn-warning','btn-secondary');
        }

    }
}




renderizarProducto(productos);

function agregarACarrito(producto) {
    carro.push(producto);
    console.table(carro);
    tablabody.innerHTML += `
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        </tr>

    `;


    //calculo
let total =carro.reduce((ac,prod) => ac + prod.precio,0);
console.log(total);
//sumando los productos 
document.getElementById('total').innerText = `Total a pagar $:${total}`;
//storage
localStorage.setItem('carro',JSON.stringify(carro));
}





let nombre = document.getElementById('nombre');
nombre.onkeyup =() =>{
    if(nombre.value.length < 3){
        console.log('nombre de menos de 3 caracteres');
        nombre.style.color = 'red';  
    }else{
        nombre.style.color = 'black';  
    }
}

let email = document.getElementById('email');
email.addEventListener('input' , () => {
    if(!email.value.includes('@') || !email.value.includes('.')){
        document.getElementById('mensaje').innerText= 'No olvides el @'
    }else{
        document.getElementById('mensaje').innerText='';
    }

})

function borrarCampos(){
    nombre.value = '';
    email.value = '';
}

let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar(ev){
    if((nombre.value=='')||(email.value == '')){
        ev.preventDefault();
        alert('Ingrese nombre o email valido !');
    }
}

//calculo

