const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');

// Función para cargar estudiantes
function cargarEstudiantes() {
  fetch('http://localhost:3000/estudiantes')
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = '';

      data.forEach(est => {
        const item = document.createElement('p');
        item.textContent = `${est.nombre} - ${est.correo} - ${est.edad} años - ${est.nivel}`;
        lista.appendChild(item);
      });
    })
    .catch(error => {
      console.error('Error al cargar estudiantes:', error);
      lista.textContent = 'No se pudieron cargar los estudiantes.';
    });
}

// Evento al enviar el formulario
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const edad = document.getElementById('edad').value;
  const nivel = document.getElementById('nivel').value;

  fetch('http://localhost:3000/estudiantes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, correo, edad, nivel })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    formulario.reset();     // Limpiar formulario
    cargarEstudiantes();    // Refrescar lista de estudiantes
  })
  .catch(error => {
    console.error('Error al enviar estudiante:', error);
  });
});

// Cargar estudiantes al iniciar la página
cargarEstudiantes();
