//En este archivo le estamos mandando un scrtipt al cliente en donde le indicamos que es lo que tiene que hacer ante un evento socket.
const socket = io()

const renderProducts = (products) => {// En esta funcion le digo al cliente como renderizar
    
    let productsTable = document
        .getElementById('productsTable')
        .getElementsByTagName('tbody')[0]
    let productRows = ''
    products.forEach((product) => {
        productRows += `<tr>
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            </tr>`
    });

    productsTable.innerHTML = productRows

    return productsTable
};

window.onload = () => {
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Se a ingresado correctamente",
        showConfirmButton: false,
        timer: 2000
    });
}

socket.on('products', (products) => { // En esta linea le digo al cliente que cuando ocurra el evento: "PRODUCTS" que ejecute la funcion renderProducts
    renderProducts(products)
});