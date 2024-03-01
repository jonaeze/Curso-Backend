//En este archivo le estamos mandando un scrtipt al cliente en donde le indicamos que es lo que tiene que hacer ante un evento socket.
const socket = io()

const renderProducts = (products) => {
        let productsTable = document
        .getElementById('productsTable')
        .getElementsByTagName('tbody')[0]
        let productRows = ''
    products.forEach((product) => {
        
        productRows += `<tr>
            <td class="tg-0lax">${product.title}</td>
            <td class="tg-0lax">${product.price}</td>
            <td class="tg-0lax">${product.code}</td>
            <td class="tg-0lax">${product.stock}</td>
        </tr>`
    });

    productsTable.innerHTML = productRows

    return productsTable
    }

socket.on('products', (products) => {
    renderProducts(products)
});