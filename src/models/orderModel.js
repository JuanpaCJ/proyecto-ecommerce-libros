const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Referencia al usuario que realiza el pedido
    items: [{
        book: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Book', 
            required: true 
        }, // Referencia al libro pedido
        quantity: { 
            type: Number, 
            required: true, 
            min: 1 
        } // Cantidad de libros pedidos
    }], // Lista de libros y cantidades en el pedido
    status: { 
        type: String, 
        required: true, 
        enum: ['in progress', 'completed', 'cancelled'], 
        default: 'in progress' 
    }, // Estado del pedido
    orderDate: { 
        type: Date, 
        default: Date.now 
    }, // Fecha en que se realizó el pedido
    completionDate: { 
        type: Date 
    } // Fecha en que se completó o canceló el pedido
}, { timestamps: true }); 
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
