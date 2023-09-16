const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index');
});
app.post('/modulos', (req, res) => {
    const lenguaje = req.body.lenguaje

    res.render('modulos', {lenguaje : lenguaje});

});
app.post('/niveles', (req, res) => {// basico intermedio avanzado 
    const niveles = req.body.niveles
    const lenguaje = req.body.lenguaje

    res.render('pago', {niveles : niveles , lenguaje : lenguaje});

});
app.post('/pago', (req, res) => {
    const niveles = req.body.niveles
    const lenguaje = req.body.lenguaje
    const pago = req.body.pago

    res.render('pago', {pago : pago , niveles : niveles , lenguaje : lenguaje});

});
app.post('/detalle', (req, res) => {
    const niveles = req.body.niveles
    const lenguaje = req.body.lenguaje
    const pago = req.body.pago
    var precio = 0

    if (lenguaje === 'java'){   
        
        precio =  metodoPago(pago , 1200)
    }else if (lenguaje === 'php'){

        precio =  metodoPago(pago , 800)
    }else if (lenguaje === 'net'){
        precio =  metodoPago(pago , 1500)
    }

    res.render('detalle', {pago : pago , niveles : niveles , lenguaje : lenguaje , precio : precio});

});
function metodoPago(pago , precio){
    if(pago === 'efectivo'){
        return precio = precio - (precio *0.1)
    }else{
        return precio
    }
}
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
