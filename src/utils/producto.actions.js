const Producto = require("./producto.model")

async function getProductoMongo(filtros) {
    const cantidadProductos = await Producto.countDocuments(filtros);
    const productosFiltrados = await Producto.find(filtros);

    return {
        resultados: productosFiltrados,
        // paginaMax: cantidadProductos / 20,
        // paginaActual: 1,
        cantidadProductos: cantidadProductos
    };
}

async function createProductoMongo(datos) {
    const productoCreado = await Producto.create(datos);

    return productoCreado;
}

async function updateProductoMongo(id, cambios) {
    const resultado = await Producto.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteProductoMongo(id) {
    const resultado = await Producto.findByIdAndDelete(id);
    
    return resultado;
}

module.exports = {
    createProductoMongo,
    getProductoMongo,
    updateProductoMongo,
    deleteProductoMongo
};