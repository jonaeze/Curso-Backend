import fs from 'fs';

class ProductManager {
    constructor(filePath) { 
        this.path = filePath;
    }

//Se lee el archivo especificado en this.path(ruta indicada) y se parsea
    
    loadProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(error.message)
            return [];
        }
    }

//Se escribe donde se guardaran los productos y luego se lo pasa a un JSON con formato legible
    
    saveProducts = async (products) => {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }

//Valida que los campos sean obligatorios
    
    validate = (product, products) => {
        if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if (products.some(savedProduct => savedProduct.code === product.code)) {
            throw new Error("El código " + product.code + " ya se encuentra utilizado por otro producto.");
        }
        
    }

//Se agrega el producto
    // POST 
    addProduct = async (product) => {
        const products = await this.loadProducts();
        this.validate(product, products);
        if (product.status === undefined || product.status !== false) {
            product.status = true  
            // Validar que si me pasaron un status que sea si o si un booleano
        } // product.status = product.status === false ? false : true;
        const newProduct = {
            id: products.length + 1, // Autoincrementar el ID
            ...product,
        };

        products.push(newProduct);
        await this.saveProducts(products);
        return products;
    }

//Se obtine la lista de productos almacenada
    //GET
    getProducts = async () => {
        const products = await this.loadProducts();
        return products;
    }

//Se busca el producto por ID
    //GET
    getProductById = async (id) => {
        try {
            const products = await this.loadProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`Not Found: No se encontró el producto con el ID ${id}.`);
        }
        return product ;
        } catch (error) {
            throw new Error(error.message)
        }
    }

// Se Actualizan los campos que se le otorgue
    //PUT
    updateProduct = async (id, updatedFields) => {
        const products = await this.loadProducts();
        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
            const updatedProduct /*producto antiguo a updatear*/ = { id, ...updatedFields };
            products[index] = updatedProduct;
            await this.saveProducts(products);
            return products[index];
        } else {
            throw new Error(`Not Found: No se encontró el producto con el ID ${id}.`);
        }
    }

//Se elimina el producto por ID
    //DELETE
    deleteProduct = async (id) => {
        let products = await this.loadProducts();
        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
            const newProducts /*Productos(ARRAY DE PRODUCTOS) sin el producto a borrar*/ = products.filter((product) => product.id !== id);
            products = newProducts;
            await this.saveProducts(products);
            return products;
        } else {
            throw new Error(`Not Found: No se encontró el producto con el ID ${id}.`);
        }
    }
}

//Se exporta la class para poder utilizar los metodos en el archivo donde sean llamados
export default ProductManager;