// script.js

document.addEventListener('DOMContentLoaded', () => {

    function setupAudioPlayer(audioId, playBtnId, progressId) {
        const audio = document.getElementById(audioId);
        const playBtn = document.getElementById(playBtnId);
        const progress = document.getElementById(progressId);

        // Play/Pause functionality
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸';
            } else {
                audio.pause();
                playBtn.textContent = '▶';
            }
        });

        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', () => {
            progress.value = (audio.currentTime / audio.duration) * 100 || 0;
        });

        // Seek functionality
        progress.addEventListener('input', () => {
            audio.currentTime = (progress.value / 100) * audio.duration;
        });

        // Reset button when audio ends
        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            progress.value = 0;
        });
    }

    // Setup players
    setupAudioPlayer('audio1', 'play1', 'progress1');
    setupAudioPlayer('audio2', 'play2', 'progress2');

});

// parte miFormulario //
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("miFormulario").addEventListener("submit", function(e) {
    e.preventDefault(); // evita recargar la página

    // CAPTURAR DATOS (enlace con inputs por id)
    let postcode = document.getElementById("postcode").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let surname = document.getElementById("surname").value;
    let address = document.getElementById("address").value;

    // VER EN CONSOLA
    console.log(postcode, phone, email, surname, address);

    // EJEMPLO VALIDACIÓN SIMPLE
    if (postcode === "" || phone === "") {
      alert("Completa los campos");
      return;
    }

    // CREAR OBJETO
    let datos = {
      postcode: postcode,
      phone: phone,
      email: email,
      surname: surname,
      address: address
    };

    console.log(datos);

  });

});
console.log("JS conectado correctamente");
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("miFormulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // CAPTURAR RESPUESTAS DEL USUARIO
    let postcode = document.getElementById("postcode").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let surname = document.getElementById("surname").value;
    let address = document.getElementById("address").value;

    // RESPUESTAS CORRECTAS (EDITA ESTO SEGÚN TU AUDIO)
    let correctas = {
      postcode: "SE21 8GP",
      phone: "07700 987782",
      email: "jvine64@kings.co.uk",
      surname: "Rathbone",
      address: "16 Russell Street"
    };

    let puntaje = 0;
    




    // FUNCIÓN PARA COMPARAR (ignora mayúsculas)
 function comparar(input, correcto, id) {
  let limpio = input.toLowerCase().trim();
  let correctoLimpio = correcto.toLowerCase().trim();

  if (limpio === correctoLimpio) {
    document.getElementById(id).style.border = "2px solid green";
    return 1;
  } else {
    document.getElementById(id).style.border = "2px solid red";
    return 0;
  }
}

    // CALIFICAR
    puntaje += comparar(postcode, correctas.postcode, "postcode");
    puntaje += comparar(phone, correctas.phone, "phone");
    puntaje += comparar(email, correctas.email, "email");
    puntaje += comparar(surname, correctas.surname, "surname");
    puntaje += comparar(address, correctas.address, "address");

    // MOSTRAR RESULTADO
    let resultado = "";

if (puntaje === 5) {
    resultado = "¡Excelente! Todas las respuestas son correctas.";
} else if (puntaje >= 3) {
    resultado = `Bien hecho, acertaste ${puntaje} de 5.`;
} else {
    resultado = `Necesitas practicar más, acertaste ${puntaje} de 5.`;
}
document.getElementById("mensaje").textContent = resultado;
  });
 })
document.getElementById("mensaje").textContent = resultado;

// 4. Agregar puntaje al objeto
datos.puntaje = puntaje;

// 5. Guardar en localStorage (AL FINAL)
let historial = JSON.parse(localStorage.getItem("respuestas")) || [];
historial.push(datos);
localStorage.setItem("respuestas", JSON.stringify(historial));
 
 
 