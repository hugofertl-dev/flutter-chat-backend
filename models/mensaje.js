const {Schema , model} = require('mongoose');

const MensajeSchema = Schema({
    de: {
        //Aca en type lo que estoy diciendo es que es una referencia de tipo Id que se vincula
        //con el modelo Usuario
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    para: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    mensaje: {
        type: String,
        require: true
    }

}, {
    //lo que hago aca en Mongo es que guarda la Fecha y Hora de esto
    timestamps: true 
});

MensajeSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);
