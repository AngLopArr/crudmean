const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO)
        .then(
            console.log("BD Conectada")
        );
    }
    catch (error){
        console.error(error);
        process.exit(1); // Detenemos la app
    }
};

module.exports = conectarDB;