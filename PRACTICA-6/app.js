// Práctica 06 — JavaScript, DOM y eventos

console.log('app.js cargado correctamente');


const estadoJs = document.getElementById('estado-js');
estadoJs.textContent = 'JavaScript activo';

const botones = document.querySelectorAll('.btn-detalle');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const targetId = boton.getAttribute('data-target');
    const panel = document.getElementById(targetId);

    if (panel) {
      panel.classList.toggle('oculto');

      if (panel.classList.contains('oculto')) {
        boton.textContent = 'Ver detalles';
      } else {
        boton.textContent = 'Ocultar';
      }
    }
  });
});

// 1. Selecciona el elemento con id "estado-js".
// 2. Cambia su textContent por: "JavaScript activo".

// 3. Selecciona todos los botones con la clase ".btn-detalle".

// 4. Recorre los botones con forEach().

// 5. A cada botón agrégale un evento "click".

// Dentro del evento:
// a) Lee el atributo "data-target" del botón.
// b) Busca el panel usando document.getElementById().
// c) Verifica que el panel exista.
// d) Usa classList.toggle("oculto").
// e) Si el panel contiene la clase "oculto", el botón debe decir
//    "Ver detalles"; en caso contrario, "Ocultar".

// Importante:
// Mantén los estilos en CSS.
// No resuelvas el ejercicio cambiando style.display directamente.
