const carrito = []

const ordenarCategoria = () => {
    productos.sort((a, b) => a.tipo - b.tipo)
    mostrarListaOrdenada()
};

const ordenarPrecio = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return 'Producto: '+producto.nombre+'. Precio: $'+producto.precio
    })
    alert('Lista de precios:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos queres comprar?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Desea agregar otro producto?')
    } while (otroProducto);

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === nombreProductoAEliminar.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaProductos)
    } else {
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    )
};

const comprar = () => {
    const ordenCategoria = confirm('¿Querés ordenar la lista de productos por categoría?')

    if (ordenCategoria) {
        ordenarCategoria()
    } else {
        ordenarPrecio()
    }
};


comprar()