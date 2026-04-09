const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Ruta nueva — responde cuando abres la URL en el navegador
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente 🚀' });
});

// Tu ruta del formulario — sigue igual
app.post('/api/formulario', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
-
    res.json({ message: 'Formulario recibido correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});