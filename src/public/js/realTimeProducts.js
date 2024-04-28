// En este archivo estamos indicando al cliente cómo renderizar las cards de productos
const socket = io();

const renderProducts = (products) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar nuevamente

  products.forEach((product, index) => {
    // Crear un nuevo contenedor de fila cada 4 productos
    if (index % 4 === 0) {
      const row = document.createElement("div");
      row.classList.add("card-row");
      cardsContainer.appendChild(row);
    }

    const currentRow = cardsContainer.lastElementChild;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${product.title}</h3>
            <p><strong>Categoria:</strong> ${product.category}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Código:</strong> ${product.code}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
        `;
    currentRow.appendChild(card);
  });

  return cardsContainer;
};

window.onload = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Se ha ingresado correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
};

socket.on("products", (products) => {
  renderProducts(products);
});
