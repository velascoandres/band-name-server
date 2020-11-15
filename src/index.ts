import express from 'express'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

// path publico

const pathPublico = path.resolve('public');



app.use(express.static(pathPublico));


app.listen(
    port,
    () => {
        console.log(pathPublico);
        console.log(`Servidor corriendo en el puerto ${port}`);
    }
);



