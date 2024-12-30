// Variables globales
let fondoEspacio;
let meteorito;
let naveEspacial;
let vidasIcono;
let meteoritos = [];
let proyectiles = [];
let particulas = [];
let naveWidth = 70;
let px, py;
let vida = 3;
let vel = 2.5;
let velMeteorito = 3;
let gameOver = false;
let destruirNave = false;
let tiempoDestruccion = 0;
let tiempoInicial;
let tiempoLimite = 60 * 1000;
let restartButton;
let botonInicio;
let botonCreditos;
let botonVolver;
let botonVolverMenu;
let estado = "menu";
let derecha = false;
let izquierda = false;
let arriba = false;
let abajo = false;
let xmin = 0, xmax, ymin = 0, ymax;

function preload() {
  fondoEspacio = loadImage('imagenes/fondo.jpeg');
  naveEspacial = loadImage('imagenes/navesita.png');
  meteorito = loadImage('imagenes/meteorito.png');
  vidasIcono = loadImage('imagenes/navesita.png');
}

function setup() {
  createCanvas(500, 500);
  xmax = width - naveWidth;
  ymax = height - 100;

  naveEspacial.resize(70, 70);
  meteorito.resize(60, 60);

  px = (width - naveWidth) / 2;
  py = height - 100;

  restartButton = createButton('Reiniciar');
  restartButton.position(width / 2 - 35, height / 2 + 50);
  restartButton.mousePressed(reiniciar);
  restartButton.hide();

  botonInicio = createButton('Iniciar');
  botonInicio.position(width / 2 - 20, height / 2);
  botonInicio.mousePressed(iniciar);

  botonCreditos = createButton('Créditos');
  botonCreditos.position(width / 2 - 30, height / 2 + 30);
  botonCreditos.mousePressed(mostrarCreditos);

  botonVolver = createButton('Volver');
  botonVolver.position(width / 2 - 30, height / 2 + 60);
  botonVolver.mousePressed(volverMenu);
  botonVolver.hide();

  botonVolverMenu = createButton('Volver al Menú');
  botonVolverMenu.position(width / 2 - 50, height / 2 + 50);
  botonVolverMenu.mousePressed(volverAlMenu);
  botonVolverMenu.hide();

  tiempoInicial = millis();
}

function draw() {
  background(fondoEspacio);

  if (vida <= 0 && !destruirNave) {
    gameOver = true;
  }

  switch (estado) {
    case "menu":
      mostrarMenu();
      break;

    case "juego":
      if (!gameOver) {
        if (destruirNave) {
          animarDestruccionNave();
        } else {
          image(naveEspacial, px, py, naveWidth, naveWidth);
        }

        handleMovement();
        handleMeteoritos();
        manejarProyectiles();

        checkCollisions();
        impVida();
        mostrarCronometro();

        if (millis() - tiempoInicial >= tiempoLimite) {
          mostrarGanaste();
        }
      } else if (vida <= 0) {
        mostrarGameOver();
      }
      break;

    case "creditos":
      mostrarPantallaCreditos();
      break;

    case "ganaste":
      mostrarPantallaGanaste();
      break;
  }
}

function iniciar() {
  estado = "juego";
  botonInicio.hide();
  botonCreditos.hide();
  tiempoInicial = millis();
}

function mostrarMenu() {
  textSize(36);
  textAlign(CENTER);
  fill(255);
  text("Space Adventure", width / 2, height / 2 - 50);
  botonInicio.show();
  botonCreditos.show();
}

function mostrarCreditos() {
  estado = "creditos";
  botonInicio.hide();
  botonCreditos.hide();
  botonVolver.show();
}

function volverMenu() {
  estado = "menu";
  botonVolver.hide();
  botonInicio.show();
  botonCreditos.show();
}

function mostrarPantallaCreditos() {
  textSize(20);
  textAlign(CENTER);
  fill(255);
  text("Créditos:", width / 2, height / 2 - 50);
  text("Gráficos: Google y Pinterest", width / 2, height / 2 - 20);
  text("Programación: Ludmila Madrid", width / 2, height / 2);
}

function mostrarGanaste() {
  estado = "ganaste";
  botonVolverMenu.show();
}

function mostrarPantallaGanaste() {
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text("¡Ganaste!", width / 2, height / 2 - 50);
  botonVolverMenu.position(width / 2 - 50, height / 2 + 10);
}

function volverAlMenu() {
  estado = "menu";
  botonVolver.hide();
  botonInicio.show();
  botonCreditos.show();
  botonVolverMenu.hide();
}

function mostrarGameOver() {
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text("¡Juego Terminado!", width / 2, height / 2);
  restartButton.show();
}

function mostrarCronometro() {
  let tiempoTranscurrido = millis() - tiempoInicial;
  let segundos = Math.floor(tiempoTranscurrido / 1000);
  let minutos = Math.floor(segundos / 60);
  segundos = segundos % 60;
  textSize(16);
  fill(255);
  textAlign(RIGHT, TOP);
  text(`Tiempo: ${nf(minutos, 2)}:${nf(segundos, 2)}`, width - 10, 10);
}

function animarDestruccionNave() {
  if (tiempoDestruccion === 0) {
    tiempoDestruccion = millis();
    crearParticulas(px + naveWidth / 2, py + naveWidth / 2);
  }

  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    p.update();
    p.show();
    if (p.alpha <= 0) {
      particulas.splice(i, 1);
    }
  }

  if (millis() - tiempoDestruccion > 2000) {
    if (vida > 0) {
      px = (width - naveWidth) / 2;
      py = height - 100;
      destruirNave = false;
      tiempoDestruccion = 0;
    } else {
      gameOver = true;
      restartButton.show();
      botonCreditos.show();
    }
  }
}

class Particula {
  constructor(x, y, esUltimaVida = false) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.size = random(10, 30);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.color = esUltimaVida ? color(random(200, 255), random(0, 50), 0) : color(255);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function crearParticulas(x, y, esUltimaVida = false) {
  let numParticulas = esUltimaVida ? 200 : 50;
  for (let i = 0; i < numParticulas; i++) {
    particulas.push(new Particula(x, y, esUltimaVida));
  }
}

function reiniciar() {
  vida = 3;
  gameOver = false;
  estado = "juego";
  px = (width - naveWidth) / 2;
  py = height - 100;
  meteoritos = [];
  proyectiles = [];
  particulas = [];
  tiempoDestruccion = 0;
  tiempoInicial = millis();
  destruirNave = false;
  restartButton.hide();
}

function handleMovement() {
  if (derecha && px < xmax) px += vel;
  if (izquierda && px > xmin) px -= vel;
  if (arriba && py > ymin) py -= vel;
  if (abajo && py < ymax) py += vel;
}

function handleMeteoritos() {
  if (random(1) < 0.02) {
    let x = random(width);
    meteoritos.push({ x, y: -50 });
  }

  for (let i = meteoritos.length - 1; i >= 0; i--) {
    let meteor = meteoritos[i];
    meteor.y += velMeteorito;

    if (meteor.y > height) {
      meteoritos.splice(i, 1);
    } else {
      image(meteorito, meteor.x, meteor.y, 60, 60);
    }
  }
}

function manejarProyectiles() {
  for (let i = proyectiles.length - 1; i >= 0; i--) {
    let p = proyectiles[i];
    p.y -= 5;

    if (p.y < 0) {
      proyectiles.splice(i, 1);
    } else {
      fill(255, 0, 0);
      noStroke();
      ellipse(p.x, p.y, 10, 10);
    }
  }
}

function checkCollisions() {
  for (let i = meteoritos.length - 1; i >= 0; i--) {
    let meteor = meteoritos[i];
    let distX = px + naveWidth / 2 - (meteor.x + 30);
    let distY = py + naveWidth / 2 - (meteor.y + 30);
    let distancia = sqrt(distX * distX + distY * distY);

    if (distancia < naveWidth / 2 + 30) {
      meteoritos.splice(i, 1);

      if (vida > 0) {
        vida--;
        destruirNave = true;
        break;
      }

      if (vida <= 0) {
        gameOver = true;
      }
    }
  }
}

function impVida() {
  textSize(16);
  fill(255);
  textAlign(LEFT, TOP);
  text(`Vidas: ${vida}`, 10, 10);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) derecha = true;
  if (keyCode === LEFT_ARROW) izquierda = true;
  if (keyCode === UP_ARROW) arriba = true;
  if (keyCode === DOWN_ARROW) abajo = true;
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) derecha = false;
  if (keyCode === LEFT_ARROW) izquierda = false;
  if (keyCode === UP_ARROW) arriba = false;
  if (keyCode === DOWN_ARROW) abajo = false;
}
