//BOTON DE CONFIRMACION DE  PAGO
const botonFinalizar = document.getElementById('botonFinalizar');
const contenedorCarrito = document.getElementById('contenedorCarrito');
const cantidad = document.getElementById('cantidad');
const carro = JSON.parse(localStorage.getItem('carro')) || []; //operador de asignacion condicional 

cantidad.innerHTML = carro.length;

//contenedorCarrito.innerHTML=''
for (const producto of carro) {
    contenedorCarrito.innerHTML +=
        `<li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
        <h6 class="my-0">${producto.nombre}</h6>
           </div>
    <span class="text-body-secondary">${producto.cant}</span>       
    <span class="text-body-secondary">$${producto.precio}</span>
    <span class="text-body-secondary">$${producto.total}</span>
</li>
  `
}

let total = carro.reduce((ac, prod) => ac + prod.total, 0);
console.log(total);
//sumando los productos 
contenedorCarrito.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
    <span>Total </span>
    <strong>$${total}</strong>
     </li>
    `;

botonFinalizar.addEventListener('click', (e) => {
    //e.preventDefault();





});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else{
            localStorage.clear()
            document.getElementById('contenedor').innerHTML= 
            '<div class="col"><h3 class="display-5 mt-5">Su pago ha sido procesado con éxito.</h3></div>';
            
            
          
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  

