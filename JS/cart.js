const carrito = document.querySelector('#carrito')
const carritoBody = document.querySelector('#lista-carrito tbody');
const listaVinos = document.querySelector('.shop__flex');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const footer = document.querySelector('#lista-carrito tfoot');
const sacarOtro = document.querySelector('.reducirValor');
const agregarOtro = document.querySelector('.aumentoValor');
let carritoArray = [];

addFunciones();

function addFunciones(){
    listaVinos.addEventListener('click', agregarVino);
    carrito.addEventListener('click', eliminarVino);
    vaciarCarrito.addEventListener('click', () => {
        carritoArray = [];

        limpiarHTML();
    })
}

function agregarVino(e){
    e.preventDefault();
    if(e.target.classList.contains('agregarCarrito')){
        const vinoSeleccionado = e.target.parentElement.parentElement;
        detallesVino(vinoSeleccionado);
    }
}


function eliminarVino(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const vinoId = e.target.getAttribute('data-id')

        carritoArray = carritoArray.filter( vino =>{
            if(vino.id === vinoId){
                if(vino.cantidad > 1){
                    vino.cantidad--;
                    return vino;
                }else{
                    delete vino
                };
            }else{
                return vino;
            }
        })
    }
    htmlCarrito();

}

function detallesVino (vino){
    const infoVino = {
        imagen: vino.querySelector("img").src,
        titulo: vino.querySelector("h2 span").textContent,
        precio: parseInt(vino.querySelector("p span").textContent),
        id: vino.querySelector("button").getAttribute('data-id'),
        cantidad: 1
    };

    const existe = carritoArray.some (vino => vino.id === infoVino.id)
    
    if(existe){
        const vinos = carritoArray.map(vino =>{
            if(vino.id === infoVino.id){
                vino.cantidad++;
                return vino;
            }else{
                return vino;
            }
        })
        carritoArray = [...vinos];
    }else{
        carritoArray = [...carritoArray, infoVino]
    }
    htmlCarrito();
    
    
}




function htmlCarrito(){

    limpiarHTML();

    carritoArray.forEach( vino => {
        const { imagen, precio, titulo, cantidad, id} = vino;
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>
            <img src="${imagen}" width="50">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${"$"+precio}
        </td>
        <td class="cantidadVinos">
           ${cantidad}
        </td>
        <td>
            <img class="borrar-curso" data-id="${id}" src="../images/iconX.svg">
        </td>
        `;

        carritoBody.appendChild(fila);
    })
    footerCarrito();
}

function footerCarrito(){

    const nCantidad = Object.values(carritoArray).reduce((acc, {cantidad}) => acc + cantidad, 0);
    const nPrecio = Object.values(carritoArray).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    footer.querySelector('th span').innerHTML = nPrecio;
}


function limpiarHTML() {
    while(carritoBody.firstChild){
        carritoBody.removeChild(carritoBody.firstChild)
    }
}

