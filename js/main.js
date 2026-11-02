/**
 * ==========================================================================
 * ARCHIVO JAVASCRIPT PRINCIPAL
 * ==========================================================================
 * Este script controla toda la interactividad de la web y está dividido en
 * 4 apartados independientes y comentados para facilitar su estudio:
 *
 * APARTADO 1: Menú de navegación móvil (abrir/cerrar con el botón hamburguesa)
 * APARTADO 2: Carrusel / Slider principal de Inicio (efecto Dragon con autoplay 7s)
 * APARTADO 3: Animaciones de entrada al hacer scroll (IntersectionObserver)
 * APARTADO 4: Banner de aviso de cookies (persistencia con localStorage)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================================
     APARTADO 1: MENÚ DE NAVEGACIÓN MÓVIL (RESPONSIVE)
     Permite mostrar u ocultar el menú principal cuando se pulsa el icono de
     hamburguesa en pantallas pequeñas (móviles y tablets).
     ======================================================================== */
  const botonMenuMovil = document.getElementById("boton-menu-movil");
  const contenedorNavegacion = document.getElementById("cabecera-navegacion");

  if (botonMenuMovil && contenedorNavegacion) {
    botonMenuMovil.addEventListener("click", () => {
      const estaAbierto = contenedorNavegacion.classList.toggle("abierto");
      botonMenuMovil.setAttribute(
        "aria-expanded",
        estaAbierto ? "true" : "false",
      );
    });
  }

  /* ========================================================================
     APARTADO 2: CARRUSEL / SLIDER HERO DE LA PÁGINA DE INICIO
     Replica el comportamiento del Prime Slider Dragon de ilqdigital.es:
     - 3 diapositivas con transición suave (fade)
     - Cambio automático cada 7 segundos (7000 ms)
     - Botones laterales numerados (01, 02, 03) para cambiar manualmente
     ======================================================================== */
  const diapositivas = document.querySelectorAll(".slider-diapositiva");
  const botonesPaginacion = document.querySelectorAll(
    ".slider-paginacion button",
  );

  if (diapositivas.length > 0) {
    let indiceActual = 0;
    const intervaloTiempo = 7000; // 7 segundos exactos como en la web original
    let temporizadorSlider = null;

    /**
     * Cambia la diapositiva visible y actualiza el botón numérico activo.
     * @param {number} nuevoIndice - Índice de la diapositiva a mostrar (0, 1 o 2).
     */
    const mostrarDiapositiva = (nuevoIndice) => {
      diapositivas.forEach((slide, i) => {
        slide.classList.toggle("activa", i === nuevoIndice);
      });

      botonesPaginacion.forEach((boton, i) => {
        boton.classList.toggle("activo", i === nuevoIndice);
        boton.setAttribute(
          "aria-current",
          i === nuevoIndice ? "true" : "false",
        );
      });

      indiceActual = nuevoIndice;
    };

    /**
     * Avanza a la siguiente diapositiva de forma cíclica.
     */
    const siguienteDiapositiva = () => {
      const siguiente = (indiceActual + 1) % diapositivas.length;
      mostrarDiapositiva(siguiente);
    };

    /**
     * Inicia o reinicia el temporizador automático del carrusel.
     */
    const iniciarAutoplay = () => {
      if (temporizadorSlider) clearInterval(temporizadorSlider);
      temporizadorSlider = setInterval(siguienteDiapositiva, intervaloTiempo);
    };

    // Asignar evento click a cada botón numérico (01, 02, 03)
    botonesPaginacion.forEach((boton, indice) => {
      boton.addEventListener("click", () => {
        mostrarDiapositiva(indice);
        iniciarAutoplay(); // Reinicia la cuenta de 7s tras hacer clic manual
      });
    });

    // Arrancar el carrusel automático al cargar la página
    iniciarAutoplay();
  }

  /* ========================================================================
     APARTADO 3: ANIMACIONES AL HACER SCROLL (IntersectionObserver)
     Detecta cuándo una sección o tarjeta entra en el área visible de la
     pantalla y le añade la clase '.visible' para disparar las animaciones
     (swing en Inicio, slideInLeft / slideInRight en Servicios).
     ======================================================================== */
  const elementosAnimados = document.querySelectorAll(".animar-al-scroll");

  if (elementosAnimados.length > 0 && "IntersectionObserver" in window) {
    const observadorScroll = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target); // Se anima una sola vez
          }
        });
      },
      {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
      },
    );

    elementosAnimados.forEach((el) => observadorScroll.observe(el));
  } else {
    // Respaldo si el navegador es antiguo: mostrar todos directamente
    elementosAnimados.forEach((el) => el.classList.add("visible"));
  }

  /* ========================================================================
     APARTADO 4: AVISO DE COOKIES INTERACTIVO
     Muestra el banner inferior de cookies si el usuario aún no ha tomado
     una decisión, y guarda su respuesta en el navegador (localStorage).
     ======================================================================== */
  const bannerCookies = document.getElementById("aviso-cookies");
  const botonAceptarCookies = document.getElementById("boton-aceptar-cookies");

  if (bannerCookies) {
    const cookiesAceptadas = localStorage.getItem("ilq_cookies_aceptadas");
    if (cookiesAceptadas === "si") {
      bannerCookies.classList.add("oculto");
    }

    if (botonAceptarCookies) {
      botonAceptarCookies.addEventListener("click", () => {
        localStorage.setItem("ilq_cookies_aceptadas", "si");
        bannerCookies.classList.add("oculto");
      });
    }
  }
});
