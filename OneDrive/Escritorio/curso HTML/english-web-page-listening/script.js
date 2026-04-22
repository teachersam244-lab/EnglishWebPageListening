// =====================
// REPRODUCTORES DE AUDIO
// =====================
document.addEventListener('DOMContentLoaded', () => {

  function setupAudioPlayer(audioId, playBtnId, progressId) {
    const audio = document.getElementById(audioId);
    const playBtn = document.getElementById(playBtnId);
    const progress = document.getElementById(progressId);

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    progress.addEventListener('input', () => {
      audio.currentTime = (progress.value / 100) * audio.duration;
    });

    audio.addEventListener('ended', () => {
      playBtn.textContent = '▶';
      progress.value = 0;
    });
  }

  setupAudioPlayer('audio1', 'play1', 'progress1');
  setupAudioPlayer('audio2', 'play2', 'progress2');

  // =====================
  // FORMULARIO Y CALIFICACIÓN
  // =====================
  document.getElementById("miFormulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // 1. CAPTURAR RESPUESTAS
    let postcode = document.getElementById("postcode").value;
    let phone    = document.getElementById("phone").value;
    let email    = document.getElementById("email").value;
    let surname  = document.getElementById("surname").value;
    let address  = document.getElementById("address").value;

    // 2. VALIDACIÓN
    if (postcode === "" || phone === "") {
      alert("Completa todos los campos");
      return;
    }

    // 3. RESPUESTAS CORRECTAS
    let correctas = {
      postcode: "SE21 8GP",
      phone:    "07700 987782",
      email:    "jvine64@kings.co.uk",
      surname:  "Rathbone",
      address:  "16 Russell Street"
    };

    // 4. FUNCIÓN COMPARAR
    function comparar(input, correcto, id) {
      if (input.toLowerCase().trim() === correcto.toLowerCase().trim()) {
        document.getElementById(id).style.border = "2px solid green";
        return 1;
      } else {
        document.getElementById(id).style.border = "2px solid red";
        return 0;
      }
    }

    // 5. CALIFICAR
    let puntaje = 0;
    puntaje += comparar(postcode, correctas.postcode, "postcode");
    puntaje += comparar(phone,    correctas.phone,    "phone");
    puntaje += comparar(email,    correctas.email,    "email");
    puntaje += comparar(surname,  correctas.surname,  "surname");
    puntaje += comparar(address,  correctas.address,  "address");

    // 6. MOSTRAR RESULTADO
    let resultado = "";
    if (puntaje === 5) {
      resultado = "¡Excelente! Todas las respuestas son correctas.";
    } else if (puntaje >= 3) {
      resultado = `Bien hecho, acertaste ${puntaje} de 5.`;
    } else {
      resultado = `Necesitas practicar más, acertaste ${puntaje} de 5.`;
    }
    document.getElementById("mensaje").textContent = resultado;

    // 7. ENVIAR A LA API ✅
    let datos = {
      postcode:     postcode,
      phone_number: phone,   // tu API espera "phone_number"
      email:        email,
      surname:      surname,
      address:      address
    };

    fetch('https://englishwebpagelistening-production-f817.up.railway.app/api/seccion-a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => console.log('✅ Guardado en BD:', data))
    .catch(err => console.error('❌ Error al guardar:', err));

  });
});

console.log("JS conectado correctamente");