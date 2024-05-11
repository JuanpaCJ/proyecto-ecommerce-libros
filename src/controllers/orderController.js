const Order = require('../models/orderModel');
const Book = require('../models/bookModel'); 
exports.createOrder = async (req, res) => {
    try {
        const { buyer, items } = req.body;
        // acuerdate de la logica pa verificar si existe
        const newOrder = new Order({ buyer, items });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
};
exports.getOrders = async (req, res) => {
    try {
        const filters = req.query;
        const orders = await Order.find(filters);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching order', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error updating order status', error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.status === 'in progress') {
            order.status = 'cancelled';
            await order.save();
            res.status(200).json({ message: 'Order cancelled successfully' });
        } else {
            res.status(400).json({ message: 'Order cannot be cancelled' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error cancelling order', error: error.message });
    }
};
exports.completeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order && order.status === 'in progress') {
            order.status = 'completed';
            order.completionDate = Date.now();
            // acuerdate de la logica pa borrar libros del pedido
            await order.save();
            res.status(200).json({ message: 'Order completed successfully' });
        } else {
            res.status(400).json({ message: 'Order cannot be completed' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error completing order', error: error.message });
    }
};
