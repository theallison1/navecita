# Space Adventure

## Descripción

Space Adventure es un emocionante juego desarrollado con JavaScript y la librería p5.js. En el juego, controlarás una nave espacial que debe evitar colisiones con meteoritos, disparar proyectiles para destruirlos y sobrevivir durante un tiempo límite para ganar.

---

## Características principales

1. **Sistema de menús interactivo**:
   - Menú principal con opciones para iniciar el juego o ver los créditos.
   - Pantalla de créditos.
   - Botones para volver al menú o reiniciar el juego tras el "Game Over".

2. **Jugabilidad**:
   - Movimiento de la nave en todas las direcciones.
   - Disparo de proyectiles para destruir meteoritos.
   - Efectos visuales de destrucción con partículas.
   - Cronómetro que cuenta el tiempo restante para ganar.

3. **Estado del juego**:
   - Vidas que disminuyen al colisionar con meteoritos.
   - Cronómetro visible que indica el tiempo restante.
   - Ganar al sobrevivir al tiempo límite.
   - Pantallas de "Game Over" y "Ganaste".

4. **Efectos visuales y animaciones**:
   - Animación de destrucción de la nave con partículas.
   - Generación de partículas al explotar.

---

## Controles

- **Teclado**:
  - Flechas de dirección: mover la nave (arriba, abajo, izquierda, derecha).
  - Barra espaciadora: disparar proyectiles.

- **Pantalla táctil**:
  - Toques en la pantalla para mover la nave.

---

## Requisitos técnicos

- Navegador moderno compatible con HTML5 y JavaScript.
- Librería p5.js instalada o cargada desde un CDN.
- Node.js instalado en el sistema para ejecutar el servidor local.

---

## Instalación y configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/space-adventure.git
   cd space-adventure
Estructura de archivos requerida:

/imagenes/fondo.jpeg: Fondo del espacio.
/imagenes/navesita.png: Sprite de la nave.
/imagenes/meteorito.png: Sprite del meteorito.
Configurar servidor local:

Crear una carpeta llamada public en el directorio principal.
Mover los archivos del juego (HTML, imágenes y JavaScript) dentro de esta carpeta.
Crear un archivo server.js con el siguiente contenido:
javascript
Copiar código
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
Instalar dependencias:

bash
Copiar código
npm install express
Ejecutar el servidor local:

bash
Copiar código
node server.js
Abrir el juego en el navegador:

Navegar a http://localhost:3000 para jugar.
Cómo jugar
Abre el juego en tu navegador.
En el menú principal, selecciona "Iniciar" para comenzar.
Controla la nave para esquivar meteoritos y dispara para destruirlos.
Intenta sobrevivir durante el tiempo límite para ganar.
Si pierdes todas tus vidas, aparecerá la pantalla de "Game Over".
Explicación técnica
Variables globales
Juego y estados:

estado: Determina el estado actual del juego ("menu", "juego", "creditos", etc.).
vida: Vida restante de la nave.
gameOver: Bandera que indica si el juego ha terminado.
destruirNave: Flag que indica si la nave está siendo destruida.
tiempoDestruccion: Controla el tiempo de la animación de destrucción.
Elementos del juego:

fondoEspacio, meteorito, naveEspacial: Imágenes cargadas con preload().
meteoritos, proyectiles, particulas: Arreglos para manejar entidades activas en el juego.
Movimientos y límites:

derecha, izquierda, arriba, abajo: Flags para movimiento.
xmin, xmax, ymin, ymax: Límites de movimiento.
Tiempo:

tiempoLimite: El tiempo límite para ganar el juego.
tiempoInicial: El tiempo en el que comienza el juego.
tiempoRestante: Calcula el tiempo restante para ganar.
Funciones principales
preload(): Carga los recursos gráficos necesarios (imágenes del fondo, la nave y los meteoritos) antes de iniciar el juego.

setup():

Configura el lienzo del juego con createCanvas.
Inicializa variables importantes como la posición de la nave (px, py) y los botones interactivos.
draw():

Es el bucle principal del juego.
Cambia el comportamiento según el estado del juego (menu, juego, creditos, etc.).
Llama a funciones específicas para manejar movimientos, meteoritos, proyectiles y colisiones.
iniciar() y reiniciar():

Cambian el estado del juego a "juego" y reinician variables para empezar o reiniciar la partida.
mostrarMenu(): Renderiza el menú principal y muestra los botones para iniciar el juego o ver los créditos.

handleMovement():

Gestiona el movimiento de la nave según las teclas presionadas.
Verifica los límites de movimiento (xmin, xmax, ymin, ymax).
handleMeteoritos():

Genera nuevos meteoritos aleatoriamente.
Actualiza su posición y los elimina cuando salen de la pantalla.
manejarProyectiles():

Actualiza la posición de los proyectiles disparados.
Detecta colisiones entre proyectiles y meteoritos.
Elimina los elementos correspondientes tras una colisión.
checkCollisions():

Detecta colisiones entre la nave y los meteoritos.
Reduce la vida de la nave o finaliza el juego si no quedan vidas.
animarDestruccionNave():

Muestra una animación de destrucción usando partículas cuando la nave pierde una vida.
Reinicia la posición de la nave o termina el juego si no hay vidas.
mostrarCronometro():

Calcula el tiempo transcurrido desde el inicio del juego.
Renderiza el tiempo restante en la esquina superior derecha.
disparar():

Agrega un nuevo proyectil a la lista de proyectiles.
crearParticulas():

Genera un conjunto de partículas en una posición dada, utilizado para la animación de explosiones.
Clases personalizadas:

Particula:
Define el comportamiento y las propiedades de las partículas.
Incluye métodos para actualizar su posición y mostrarla en pantalla.
Interacción del usuario
keyPressed() y keyReleased():

Detectan las teclas presionadas para mover la nave o disparar proyectiles.
touchStarted() y touchEnded():

Detectan interacciones táctiles para mover la nave en dispositivos móviles.
Créditos
Gráficos: Google y Pinterest.
Programación: Ludmila Madrid.
