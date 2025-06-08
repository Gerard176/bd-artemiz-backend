import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import conectarDB from './services/db.js'
import routerGeneral from './routes/index.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routerGeneral);
conectarDB();

app.use( '/uploads' , express.static("public/img"));
app.use( '/obras' , express.static("public/img/obras"));




// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



