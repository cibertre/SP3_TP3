import express from 'express';
import methodOverride from 'method-override';

import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// CONFIGURACION EJS
// =========================

app.set('view engine', 'ejs');
app.set('views', './views');

// =========================
// MIDDLEWARES
// =========================

// Archivos estaticos
app.use(express.static('public'));

// Parsear formularios
app.use(express.urlencoded({ extended: true }));

// Parsear JSON
app.use(express.json());

// Method Override
app.use(methodOverride('_method'));

// =========================
// RUTAS
// =========================

// API
app.use('/api', superHeroRoutes);

// Vistas
app.use('/', superHeroRoutes);

// =========================
// CONEXION DB
// =========================

connectDB();

// =========================
// 404
// =========================

app.use((req, res) => {
    res.status(404).send({
        mensaje: 'Ruta no encontrada'
    });
});

// =========================
// SERVIDOR
// =========================

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});