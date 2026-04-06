const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/curso-ingles')
  .then(() => console.log('Conectado a MongoDB 🚀'))
  .catch(err => console.log(err));

// 🔥 modelo
const EstudianteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  edad: Number,
  nivel: String
});

const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

// 🔥 guardar en DB
app.post('/estudiantes', async (req, res) => {
  const nuevo = new Estudiante(req.body);
  await nuevo.save();

  console.log('Guardado en DB:', nuevo);
  res.json(nuevo);
});

// 🔥 obtener datos
app.get('/estudiantes', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const edad = document.getElementById('edad').value;
  const nivel = document.getElementById('nivel').value;

  fetch('http://localhost:3000/estudiantes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, edad, nivel })
  })
  .then(res => res.json())
  .then(estudiante => {
    // Crear nueva fila y agregarla al tbody
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${estudiante.nombre}</td>
      <td>${estudiante.correo}</td>
      <td>${estudiante.edad} años</td>
      <td>${estudiante.nivel}</td>
    `;
    tbody.appendChild(fila);

    formulario.reset(); // Limpiar formulario
  })
  .catch(error => console.error('Error:', error));
});