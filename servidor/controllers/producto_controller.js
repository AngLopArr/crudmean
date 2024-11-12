const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try{
        let producto;

        // Creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save();
        res.json({Success: "El producto se ha creado correctamente."});
    }
    catch (error){
        console.error(error);
        res.status(500).send('Error en el servidor.')
    }
}

exports.obtenerProductos = async (req, res) => {
    try{
        const productos = await Producto.find();
        res.json(productos);
    }
    catch (error){
        console.error(error);
        res.status(500).send('Error en el servidor.')
    }
}

exports.actualizarProducto = async (req, res) => {
    try{
        const actualizacion = req.body;

        await Producto.findByIdAndUpdate({_id: req.params.id}, actualizacion, {new: true});
        res.json({Success: "El producto se ha modificado correctamente."});
    }
    catch (error){
        console.error(error);
        res.status(404).send('No existe el producto que se quiere modificar.')
    }
}

exports.obtenerProducto = async (req, res) => {
    try{
        let producto = await Producto.findById(req.params.id);
        res.json(producto);
    }
    catch (error){
        console.error(error);
        res.status(404).send('No existe el producto que se quiere obtener.')
    }
}

exports.eliminarProducto = async (req, res) => {
    try{
        await Producto.findByIdAndDelete(req.params.id);
        res.json({Success: "El producto se ha eliminado correctamente."});
    }
    catch (error){
        console.error(error);
        res.status(404).send('No existe el producto que se quiere eliminar.')
    }
}