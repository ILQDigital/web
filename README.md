# ILQ Digital

Web personal de diseño web, mantenimiento y formación en WordPress para emprendedores y pequeños negocios. Un diseño cercano, práctico y fácil de gestionar.

## Qué encontrarás

- **Inicio**: presentación con slider (Diseño Web, Tranquilidad para tu Web y Formación)
- **Servicios**: diseño web en WordPress, integración con redes sociales, ajustes básicos de SEO y seguridad
- **Formación**: aprende a gestionar, actualizar y hacer copias de seguridad de tu propia web
- **Portafolios**: apps hechas con IA, webs agrícolas, tienda online ecológica, aula virtual de terapias y blogs
- **Sobre mí**: mi misión y cómo trabajo
- **Contacto**: por WhatsApp o correo electrónico
- Páginas legales: aviso legal, privacidad y cookies

## Cómo está hecha

- HTML, CSS y JavaScript puro, sin WordPress ni base de datos (web estática)
- Responsive, con menú móvil tipo hamburguesa
- Slider de inicio con autoplay y animaciones al hacer scroll
- Banner de cookies (se guarda con `localStorage`)
- SEO básico: títulos y descripciones por página, `sitemap.xml` e imágenes con nombres descriptivos
- Alojada en GitHub Pages

## Estructura

```
├── index.html
├── servicios.html
├── formacion.html
├── portafolios.html
├── sobre-mi.html
├── contacto.html
├── aviso-legal.html / privacidad.html / cookies.html
├── sitemap.xml
├── css/styles.css
├── js/main.js      (comentado por apartados)
└── img/
```

## Ver la web

[Visitar la web](https://ilqdigital.es)

## Historial

Esta es la **cuarta versión** de la web. Ha pasado por varias modificaciones de diseño y en noviembre de 2026 migró de WordPress a HTML estático.

### Por qué pasé de WordPress a web estática

- **Comodidad**: edito los archivos directamente y subo los cambios con Git, sin entrar a ningún panel
- **Velocidad**: carga más rápido al no depender de base de datos, plugins ni tema
- **Seguridad**: menos superficie de ataque, sin plugins que actualizar ni vulnerabilidades de WordPress
- **Mantenimiento**: no hay actualizaciones constantes ni copias de la base de datos
- **Coste**: el alojamiento en GitHub Pages es gratuito
- **Control**: sé exactamente qué código tiene la web y puedo versionar cada cambio
- **Aprendizaje**: el código está comentado, así que sirve también para estudiarlo

WordPress sigue siendo lo que ofrezco a mis clientes en [servicios](servicios.html) y [formación](formacion.html). Esta web es mi propio proyecto.

## Licencia

Este proyecto se publica bajo licencia GPL.
