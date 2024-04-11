//En este archivo le estamos mandando un scrtipt al cliente en donde le indicamos que es lo que tiene que hacer ante un evento socket.
const socket = io()

const renderProducts = (products) => {
    console.log("productos del lado del cliente: ", products)// En esta funcion le digo al cliente como renderizar
    let productsTable = document
        .getElementById('productsTable')
        .getElementsByTagName('tbody')[0]
    let productRows = ''
    products.forEach((product) => {
        productRows += `<tr>
                            <td>${product.title}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            </tr>`
    });

    productsTable.innerHTML = productRows

    return productsTable
};

socket.on('products', (products) => { // En esta linea le digo al cliente que cuando ocurra el evento: "PRODUCTS" que ejecute la funcion renderProducts
    renderProducts(products)
});