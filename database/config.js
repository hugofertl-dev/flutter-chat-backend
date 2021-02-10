const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');

    } catch (error) {
        console.log(errror);
        throw new Error('Error en la base de datos - Hable con el Administrador');
    }
}
//Esta exportacion que hago aca es para poder utilizar esta funcion no es automatico
// como en Dart debo declaralo aca para despues poder invocarla
module.exports = {
    dbConnection
}