/**
 * ==========================================================================
 * ARCHIVO JAVASCRIPT PRINCIPAL (VERSIÓN ONE-PAGE UNIFICADA)
 * ==========================================================================
 * Este script controla toda la interactividad de la web y está dividido en
 * 4 apartados independientes y comentados en castellano:
 *
 * APARTADO 1: Menú de navegación móvil (abrir/cerrar y cierre automático al pulsar un enlace)
 * APARTADO 2: Resaltado automático del apartado activo en el menú al hacer scroll (ScrollSpy) y URL limpia
 * APARTADO 3: Carrusel / Slider principal de Inicio (efecto Dragon con autoplay 7s)
 * APARTADO 4: Animaciones suaves y unificadas al hacer scroll (IntersectionObserver)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================================
     APARTADO 1: MENÚ DE NAVEGACIÓN MÓVIL (RESPONSIVE)
     Permite mostrar u ocultar el menú principal cuando se pulsa el icono de
     hamburguesa en pantallas pequeñas, y lo cierra automáticamente cuando
     el usuario selecciona cualquier apartado de la página única.
     ======================================================================== */
  const botonMenuMovil = document.getElementById("boton-menu-movil");
  const contenedorNavegacion = document.getElementById("cabecera-navegacion");

  if (botonMenuMovil && contenedorNavegacion) {
    botonMenuMovil.addEventListener("click", () => {
      const estaAbierto = contenedorNavegacion.classList.toggle("abierto");
      botonMenuMovil.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
    });

    // Cerrar el menú móvil al hacer clic en cualquier enlace de navegación interna
    const enlacesMenu = contenedorNavegacion.querySelectorAll("a");
    enlacesMenu.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        if (contenedorNavegacion.classList.contains("abierto")) {
          contenedorNavegacion.classList.remove("abierto");
          botonMenuMovil.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ========================================================================
     APARTADO 2: INDICADOR ACTIVO EN EL MENÚ AL HACER SCROLL (SCROLLSPY)
     Detecta qué apartado de la página única (#inicio, #sobre-mi, #servicios,
     #formacion, #portafolios) está visible en pantalla y marca su enlace
     correspondiente en la cabecera con la clase '.activo'.
     ======================================================================== */
  const seccionesNavegables = document.querySelectorAll("main > section[id]");
  const enlacesCabecera = document.querySelectorAll(".menu-lista a[href^='#']");

  if (seccionesNavegables.length > 0 && enlacesCabecera.length > 0) {
    const actualizarMenuActivo = () => {
      const posicionScroll = window.scrollY + 180;

      seccionesNavegables.forEach((seccion) => {
        const topeSeccion = seccion.offsetTop;
        const altoSeccion = seccion.offsetHeight;
        const idSeccion = seccion.getAttribute("id");

        if (posicionScroll >= topeSeccion && posicionScroll < topeSeccion + altoSeccion) {
          enlacesCabecera.forEach((enlace) => {
            const esActivo = enlace.getAttribute("href") === `#${idSeccion}`;
            enlace.classList.toggle("activo", esActivo);
            if (esActivo) {
              enlace.setAttribute("aria-current", "page");
            } else {
              enlace.removeAttribute("aria-current");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", actualizarMenuActivo, { passive: true });
  }

  /* ========================================================================
     APARTADO 2.1: NAVEGACIÓN INTERNA CON URL LIMPIA (SIN # EN LA BARRA DE DIRECCIONES)
     Intercepta los clics en enlaces internos (#inicio, #sobre-mi, #servicios, etc.)
     para desplazarse suavemente al apartado sin añadir la almohadilla (#...) a la URL,
     y limpia también el hash si se llega desde una página legal externa.
     ======================================================================== */
  const enlacesAnclaInternos = document.querySelectorAll('a[href^="#"]');

  enlacesAnclaInternos.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      const idDestino = enlace.getAttribute("href");
      if (!idDestino || idDestino === "#") return;

      const elementoDestino = document.querySelector(idDestino);
      if (elementoDestino) {
        evento.preventDefault(); // Evita que el navegador escriba #apartado en la URL
        elementoDestino.scrollIntoView({ behavior: "smooth", block: "start" });

        // Si había algún # en la URL previamente, lo limpia sin recargar la página
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    });
  });

  // Si se entra a index.html#apartado desde Aviso Legal / Privacidad / Cookies,
  // desplaza al apartado y limpia inmediatamente el # de la barra de direcciones
  if (window.location.hash) {
    const destinoInicial = document.querySelector(window.location.hash);
    if (destinoInicial) {
      setTimeout(() => {
        destinoInicial.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 50);
    }
  }

  /* ========================================================================
     APARTADO 3: CARRUSEL / SLIDER HERO DE LA PÁGINA DE INICIO
     Replica el comportamiento del Prime Slider Dragon de ilqdigital.es:
     - 3 diapositivas con transición suave (fade)
     - Cambio automático cada 7 segundos (7000 ms)
     - Botones laterales numerados (01, 02, 03) para cambiar manualmente
     ======================================================================== */
  const diapositivas = document.querySelectorAll(".slider-diapositiva");
  const botonesPaginacion = document.querySelectorAll(".slider-paginacion button");

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
        boton.setAttribute("aria-current", i === nuevoIndice ? "true" : "false");
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
     APARTADO 4: ANIMACIONES SUAVES UNIFICADAS AL HACER SCROLL
     Detecta cuándo un bloque entra en el área visible de la pantalla y le
     añade la clase '.visible' para disparar la transición suave (fade-up).
     ======================================================================== */
  const elementosAnimados = document.querySelectorAll(".animar-al-scroll");

  if (elementosAnimados.length > 0 && "IntersectionObserver" in window) {
    const observadorScroll = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target); // Se anima una sola vez de forma limpia
          }
        });
      },
      {
        threshold: 0.12, // Se activa cuando el 12% del bloque es visible
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elementosAnimados.forEach((el) => observadorScroll.observe(el));
  } else {
    // Respaldo si el navegador es antiguo: mostrar todos directamente
    elementosAnimados.forEach((el) => el.classList.add("visible"));
  }
});
