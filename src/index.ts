import express from 'express'
import path from 'path';

const app = express();
const port = 3000;

// path publico

const pathPublico = path.resolve('public');



app.use(express.static(pathPublico));


app.listen(
    3000,
    () => {
        console.log(pathPublico);
        console.log('Servidor corriendo en el puerto 3000');
    }
);



