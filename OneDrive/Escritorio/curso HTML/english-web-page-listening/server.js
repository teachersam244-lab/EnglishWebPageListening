const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente 🚀' });
});

// Sección A — datos personales
app.post('/api/seccion-a', async (req, res) => {
    const { postcode, phone_number, email, surname, address } = req.body;

    if (!postcode || !phone_number || !email || !surname || !address) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        await pool.query(
            'INSERT INTO respuestas_a (postcode, phone_number, email, surname, address) VALUES ($1, $2, $3, $4, $5)',
            [postcode, phone_number, email, surname, address]
        );
        res.json({ message: 'Sección A guardada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar sección A' });
    }
});

// Sección B — match de situaciones
app.post('/api/seccion-b', async (req, res) => {
    const { a_buying_something, b_checking_into_hotel, c_trying_to_help, d_giving_directions, e_giving_class_info, f_arriving_restaurant } = req.body;

    try {
        await pool.query(
            'INSERT INTO respuestas_b (a_buying_something, b_checking_into_hotel, c_trying_to_help, d_giving_directions, e_giving_class_info, f_arriving_restaurant) VALUES ($1, $2, $3, $4, $5, $6)',
            [a_buying_something, b_checking_into_hotel, c_trying_to_help, d_giving_directions, e_giving_class_info, f_arriving_restaurant]
        );
        res.json({ message: 'Sección B guardada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar sección B' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});