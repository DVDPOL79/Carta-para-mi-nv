const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Navegando...");
  });
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const reveals = entry.target.querySelectorAll(".reveal");

        reveals.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 1000);
        });
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Carrusel
const fotos = [
  "assets/img/1.jpg",
  "assets/img/2.jpg",
  "assets/img/3.jpg",
  "assets/img/4.jpg",
  "assets/img/5.jpg",
  "assets/img/6.jpg",
  "assets/img/7.jpg",
];

let indiceActual = 0;

const img = document.getElementById("carouselImg"); // Se obtiene el contenedor de la imagen.
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function mostrarFoto() {
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = fotos[indiceActual];
    img.style.opacity = 1;
  }, 200);
}

nextBtn.addEventListener("click", () => {
  indiceActual++;

  if (indiceActual >= fotos.length) {
    indiceActual = 0;
  }

  mostrarFoto();
});

prevBtn.addEventListener("click", () => {
  indiceActual--;

  if (indiceActual < 0) {
    indiceActual = fotos.length - 1;
  }

  mostrarFoto();
});

// Funcionalidad de swipe para dispositivos táctiles
let startX = 0;

img.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

img.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextBtn.click();
  }

  if (endX - startX > 50) {
    prevBtn.click();
  }
});

const noviosEl = document.getElementById("novios");
const conocernosEl = document.getElementById("conocernos");
const faltanteEl = document.getElementById("faltante");  // Asegúrate de que este esté correctamente declarado.

// Fechas importantes
const fechaNovios = new Date(2025, 10, 16);     // 16 noviembre 2025
const fechaConocernos = new Date(2024, 9, 16);  // 16 octubre 2024
const fecha100Anios = new Date(2124, 9, 16);    // 16 octubre 2124

// Función para calcular los días, horas, minutos y segundos
function calcularTiempo(fechaInicio) {
  const ahora = new Date();
  let diferencia = ahora - fechaInicio;

  // Si la fecha aún no llegó, evitar números negativos
  if (diferencia < 0) {
    diferencia = 0;
  }

  const segundosTotales = Math.floor(diferencia / 1000);
  const dias = Math.floor(segundosTotales / 86400);  // 86400 segundos en un día
  const horas = Math.floor((segundosTotales % 86400) / 3600);  // 3600 segundos en una hora
  const minutos = Math.floor((segundosTotales % 3600) / 60);  // 60 segundos en un minuto
  const segundos = segundosTotales % 60;

  return `${dias} días ${horas} h ${minutos} min ${segundos} s`;
}

// Función para calcular el tiempo faltante
function calcularTiempoFaltante(fechaObjetivo) {
  const ahora = new Date();
  let diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    return "Toda una vida juntos ❤️";
  }

  const segundosTotales = Math.floor(diferencia / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  return `${dias} días ${horas} h ${minutos} min ${segundos} s`;
}

// Función para actualizar los contadores
function actualizarContadores() {
  noviosEl.textContent = calcularTiempo(fechaNovios);
  conocernosEl.textContent = calcularTiempo(fechaConocernos);
  faltanteEl.textContent = calcularTiempoFaltante(fecha100Anios);  // Asegúrate de que esta función esté aquí
}

// Actualiza inmediatamente la primera vez
actualizarContadores();

// Actualiza cada segundo (ligero y seguro)
setInterval(actualizarContadores, 1000);
