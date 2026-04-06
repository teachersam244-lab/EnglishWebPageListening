const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/formulario', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    res.json({ message: 'Formulario recibido correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});