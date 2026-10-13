// Práctica 07 — Variables y funciones
// Escenario: monitor de riego para un huerto urbano.
// Las reglas de cálculo son pedagógicas, no agronómicas.

const zonas = [
  { nombre: 'Semillero Norte', cultivo: 'Tomate', humedad: 34, temperatura: 29, areaM2: 8, activa: true },
  { nombre: 'Bancal Central', cultivo: 'Lechuga', humedad: 52, temperatura: 26, areaM2: 12, activa: true },
  { nombre: 'Sector Aromáticas', cultivo: 'Albahaca', humedad: 68, temperatura: 25, areaM2: 6, activa: true },
  { nombre: 'Parcela Sur', cultivo: 'Chile dulce', humedad: 41, temperatura: 30, areaM2: 10, activa: false }
];

const META_HUMEDAD = 60;

// EJERCICIO 1
// Verificación de tipos de datos y template literal para zonas[0]
console.log('Tipo de zonas:', typeof zonas);
console.log('Tipo de META_HUMEDAD:', typeof META_HUMEDAD);
console.log('Tipo de nombre zona 0:', typeof zonas[0].nombre);

const mensajeInicial = `Zona principal: ${zonas[0].nombre} con cultivo de ${zonas[0].cultivo} y humedad actual de ${zonas[0].humedad}%.`;
console.log(mensajeInicial);

// EJERCICIO 2
function calcularDeficit(humedad, meta = META_HUMEDAD) {
  const deficit = meta - humedad;
  return deficit > 0 ? deficit : 0;
}

// EJERCICIO 3
const obtenerEstado = (humedad) => {
  if (humedad < 35) {
    return { texto: 'Urgente', clase: 'estado--urgente' };
  }
  if (humedad < 55) {
    return { texto: 'Vigilar', clase: 'estado--vigilar' };
  }
  return { texto: 'Estable', clase: 'estado--estable' };
};

function estimarLitros(areaM2, deficit, factor = 0.12) {
  const total = areaM2 * deficit * factor;
  return Number(total.toFixed(1));
}

// EJERCICIO 4
function crearTarjetaZona(zona) {
  let estadoTexto = '';
  let estadoClase = '';
  let litrosEstimados = 0.0;

  if (!zona.activa) {
    estadoTexto = 'Zona pausada';
    estadoClase = 'estado--pausada';
    litrosEstimados = (0).toFixed(1);
  } else {
    const deficit = calcularDeficit(zona.humedad);
    const estado = obtenerEstado(zona.humedad);
    estadoTexto = estado.texto;
    estadoClase = estado.clase;
    litrosEstimados = estimarLitros(zona.areaM2, deficit).toFixed(1);
  }

  return `
    <article class="zona-card">
      <div class="zona-card__top">
        <div>
          <h3>${zona.nombre}</h3>
          <p class="zona-card__cultivo">${zona.cultivo} · ${zona.areaM2} m²</p>
        </div>
        <span class="estado ${estadoClase}">${estadoTexto}</span>
      </div>
      <div class="zona-card__datos">
        <div class="dato">
          <span>Humedad</span>
          <strong>${zona.humedad}%</strong>
        </div>
        <div class="dato">
          <span>Temperatura</span>
          <strong>${zona.temperatura} °C</strong>
        </div>
        <div class="dato">
          <span>Riego est.</span>
          <strong>${litrosEstimados} L</strong>
        </div>
      </div>
    </article>
  `;
}

// EJERCICIO 5
const panel = document.querySelector('#panel-zonas');
panel.innerHTML = zonas.map((zona) => crearTarjetaZona(zona)).join('');

// EJERCICIO 6
// Funciones con rest parameters
function calcularPromedio(...valores) {
  if (valores.length === 0) return 0;

  let total = 0;
  for (const valor of valores) {
    total += valor;
  }
  return Number((total / valores.length).toFixed(1));
}

function sumarRiego(...litros) {
  let total = 0;
  for (const l of litros) {
    total += l;
  }
  return Number(total.toFixed(1));
}

const resumen = document.querySelector('#resumen');

// 1. Obtener arreglo de humedades
const humedades = zonas.map((z) => z.humedad);

// 2. Calcular promedio pasando valores con spread operator al rest parameter
const promedioHumedad = calcularPromedio(...humedades);

// 3. Calcular litros solo de las zonas activas
const litrosZonasActivas = zonas
  .filter((z) => z.activa)
  .map((z) => estimarLitros(z.areaM2, calcularDeficit(z.humedad)));

const totalRiegoLitros = sumarRiego(...litrosZonasActivas);

// 4. Renderizar bloque de resumen
resumen.innerHTML = `
  <div class="resumen__dato">
    <span>Humedad promedio</span>
    <strong>${promedioHumedad}%</strong>
  </div>
  <div class="resumen__dato">
    <span>Riego total requerido</span>
    <strong>${totalRiegoLitros} L</strong>
  </div>
`;