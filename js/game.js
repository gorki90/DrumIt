'use strict';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//cargar las canciones en objeto canciones

var canciones = {
    0: new Audio("/assets/music/BeatIt.mp3"),
    1: new Audio("/assets/music/IWanttoBreakFree.mp3"),
    2: new Audio("/assets/music/LivinOnAPrayer.mp3"),
    3: new Audio("/assets/music/Onewayoranother.mp3"),
    4: new Audio("/assets/music/SomebodyToLove.mp3"),
    5: new Audio("/assets/music/RaiseYourGlass.mp3"),
    6: new Audio("/assets/music/ILoveRocknRoll.mp3"),
    7: new Audio("/assets/music/TheScientist.mp3"),
    8: new Audio("/assets/music/Viva La Vida.mp3"),
}

var notas = [];

console.log(notas)




var posXcirculo = canvas.width - 42;
var radioCirculo = 40;
const controladores = {};
const estadoBotones = {};
var gameframe = 0;


function dibujarTablero() {

    const cuerdas = 5;
    var posYinicial = 200;
    const rayas = 10;
    var posXinicial = 10;
    //rayas horizontales del tablero
    for (let i = 0; i <= cuerdas; i++) {
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.strokeStyle = "#872341";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(10, posYinicial);
        ctx.lineTo(canvas.width, posYinicial);
        posYinicial += 100;
    }


    //rayas verticales del tablero
    for (let j = 0; j <= rayas; j++) {
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.strokeStyle = "#872341";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(posXinicial, canvas.height-87);
        ctx.lineTo(posXinicial, 200);
        posXinicial += 200;
    }
}


const keys = [];

//clase circulo para crear los circulos
class Circulo {
    constructor(posx, posy, radio, color, colorBorde) {

        this.posx = posx;
        this.posy = posy;
        this.radio = radio;
        this.color = color;
        this.colorBorde = colorBorde;

    };

    crearArc(contexto) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.colorBorde;
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

}

class Notes {
    constructor(posy, color) {

        this.posx = 10;
        this.posy = posy;
        this.radio = 20;
        this.color = color;
        this.colorBorde = "#22092C";
        this.speed = 6;
        this.distance;
    };
    velocidadNota() {
        this.posx += this.speed;
    }

    crearNota(contexto) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.colorBorde;
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    checkCollision(circle) {

        const distance = Math.sqrt(Math.pow(this.posx - circle.posx, 2) + Math.pow(this.posy - circle.posy, 2));
        const collision = distance < this.radio + circle.radio;
        return collision;
    }

}

function getRandomColor() {
    const colors = ["red", "cyan", "lime", "yellow", "magenta"];
    const colorRandom = Math.floor(Math.random() * colors.length);
    return colors[colorRandom];
}

function getRandomPosy(color) {
    let posy;
    if (color === "red") {
        posy = 200;
    } else if (color === "cyan") {
        posy = 300;
    } else if (color === "lime") {
        posy = 400;
    } else if (color === "yellow") {
        posy = 500;
    } else {
        posy = 600;
    }
    return posy;
}

function añadirNota() {

    if (gameframe % 50 == 0) {
        const randomColor = getRandomColor();
        const randomPosy = getRandomPosy(randomColor);
        notas.push(new Notes(randomPosy, randomColor));
    }

    for (let i = 0; i < notas.length; i++) {
        notas[i].velocidadNota();
        notas[i].crearNota();

        if (notas[i].posx + notas[i].radio > circuloRojo.posx - radioCirculo &&
            notas[i].posx - notas[i].radio < circuloRojo.posx + radioCirculo) {
            if (notas.length > 0 && notas[i]) {



                if (pulsado === 65 && notas[i].checkCollision(circuloRojo)) {

                    notas.splice(i, 1);
                    handleCorrectKey("red");
                    i--;
                } else if (pulsado === 87 && notas[i].checkCollision(circuloAzul)) {

                    handleCorrectKey("cyan");
                    notas.splice(i, 1);
                    i--;
                } else if (pulsado === 83 && notas[i].checkCollision(circuloVerde)) {

                    handleCorrectKey("lime");
                    notas.splice(i, 1);
                    i--;
                } else if (pulsado === 68 && notas[i].checkCollision(circuloAmarillo)) {

                    handleCorrectKey("yellow");
                    notas.splice(i, 1);
                    i--;
                } else if (pulsado === 90 && notas[i].checkCollision(circuloRosa)) {
                    handleCorrectKey("magenta");
                    notas.splice(i, 1);
                    i--;
                } else if (pulsado === 90 && notas[i].posx > canvas.width) {

                    notas.splice(i, 1);
                    i--;
                }

            }
        }

    }
}

var score = 0;

function dibujarPuntos(contexto) {
    ctx.font = "30px Rock Salt";
    ctx.fillStyle = "#F05941";
    ctx.textAlign = "center";
    ctx.fillText("Puntos: " + score, 500, 100)
}

function handleCorrectKey(color) {
    score += 10;
    const sparkleSize = 50;
    const sparkleColor = 'gold';
    for (let j = 0; j < 5; j++) {
        if (color==="red"){
        const sparkleX = posXcirculo;
        const sparkleY = 200;
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
        ctx.fillStyle = sparkleColor;
        ctx.fill();
        ctx.closePath();
        }else if(color==="cyan"){
            const sparkleX = posXcirculo;
            const sparkleY = 300;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
            ctx.fillStyle = sparkleColor;
            ctx.fill();
            ctx.closePath();
        }else if(color==="lime"){
            const sparkleX = posXcirculo;
            const sparkleY = 400;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
            ctx.fillStyle = sparkleColor;
            ctx.fill();
            ctx.closePath();
        }else if(color==="yellow"){
            const sparkleX = posXcirculo;
            const sparkleY = 500;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
            ctx.fillStyle = sparkleColor;
            ctx.fill();
            ctx.closePath();
        }else {
            const sparkleX = posXcirculo;
            const sparkleY = 600;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
            ctx.fillStyle = sparkleColor;
            ctx.fill();
            ctx.closePath();
        }
        

        
    }
}
let impreso1 = false;
let impreso2 = false;
let impreso3 = false;
let impreso4 = false;
let impreso5 = false;
let impreso6 = false;
let impreso7 = false;
let impreso8 = false;

function mensajes() {
    if (score >= 100 && !impreso1) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Vas genial " + username + "! !Sigue así!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso1 = true;
    } else if (score >= 400 && !impreso2) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Estás arrasando " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso2 = true;
    } else if (score >= 700 && !impreso3) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "Vas de camino a ser una Rock Star " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso3 = true;
    } else if (score >= 1000 && !impreso4) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Lo estás reventando " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso4 = true;
    } else if (score >= 1300 && !impreso5) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Genial " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso5 = true;
    } else if (score >= 1600 && !impreso6) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Increible " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso6 = true;
    } else if (score >= 1900 && !impreso7) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Increible " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso7 = true;
    } else if (score >= 2200 && !impreso8) {
        let msg100 = document.createElement("h3");
        msg100.textContent = "¡Eres una Rock Star " + username + "!";
        msg100.classList.add("mensaje");
        document.body.appendChild(msg100);
        setTimeout(function () {
            document.body.removeChild(msg100);
        }, 3000);
        impreso8 = true;
    }
}

var circuloRojo = new Circulo(posXcirculo, 200, radioCirculo, "red", "white");
var circuloAzul = new Circulo(posXcirculo, 300, radioCirculo, "cyan", "white");
var circuloVerde = new Circulo(posXcirculo, 400, radioCirculo, "lime", "white");
var circuloAmarillo = new Circulo(posXcirculo, 500, radioCirculo, "yellow", "white");
var circuloRosa = new Circulo(posXcirculo, 600, radioCirculo, "magenta", "white");

let pulsado = null;

window.addEventListener("keydown", function (e) {
    let tecla = [];
    pulsado = e.keyCode;
    tecla[e.keyCode] = true;

    switch (e.keyCode) {
        case 65:
            circuloRojo.color = "#b81414";
            circuloRojo.colorBorde = "red";
            circuloRojo.crearArc(ctx);


            break;

        case 87:
            circuloAzul.color = "blue";
            circuloAzul.colorBorde = "cyan";
            circuloAzul.crearArc(ctx);

            break;

        case 83:
            circuloVerde.color = "green";
            circuloVerde.colorBorde = "lime";
            circuloVerde.crearArc(ctx);

            break;

        case 68:
            circuloAmarillo.color = "#eccd6a";
            circuloAmarillo.colorBorde = "yellow";
            circuloAmarillo.crearArc(ctx);

            break;

        case 90:
            circuloRosa.color = "pink";
            circuloRosa.colorBorde = "magenta";
            circuloRosa.crearArc(ctx);

            break;

    }
});

window.addEventListener("keyup", function (e) {
    let teclaUp = [];
    pulsado = null;
    teclaUp[e.keyCode] = true;

    switch (e.keyCode) {
        case 65:
            circuloRojo.color = "red";
            circuloRojo.colorBorde = "white";
            circuloRojo.crearArc(ctx);
            break;
        case 87:
            circuloAzul.color = "cyan";
            circuloAzul.colorBorde = "white";
            circuloAzul.crearArc(ctx);
            break;

        case 83:
            circuloVerde.color = "lime";
            circuloVerde.colorBorde = "white";
            circuloVerde.crearArc(ctx);
            break;

        case 68:
            circuloAmarillo.color = "yellow";
            circuloAmarillo.colorBorde = "white";
            circuloAmarillo.crearArc(ctx);
            break;

        case 90:
            circuloRosa.color = "magenta";
            circuloRosa.colorBorde = "white";
            circuloRosa.crearArc(ctx);
            break;
    }
});


function botonPulsado(id) {
    let botonMandoPulsado = null;
    if (!estadoBotones[id]) {
        switch (id) {
            case 0:
                botonMandoPulsado = 65;
                circuloRojo.color = "#b81414";
                circuloRojo.colorBorde = "red";
                circuloRojo.crearArc(ctx);
                setTimeout(function () {
                    circuloRojo.color = "red";
                    circuloRojo.colorBorde = "white";
                    circuloRojo.crearArc(ctx);

                }, 100);
                break;

            case 1:
                botonMandoPulsado = 87;
                circuloAzul.color = "blue";
                circuloAzul.colorBorde = "cyan";
                circuloAzul.crearArc(ctx);
                setTimeout(function () {
                    circuloAzul.color = "cyan";
                    circuloAzul.colorBorde = "white";
                    circuloAzul.crearArc(ctx);
                }, 100);
                break;

            case 2:
                botonMandoPulsado = 83;
                circuloVerde.color = "green";
                circuloVerde.colorBorde = "lime";
                circuloVerde.crearArc(ctx);
                setTimeout(function () {
                    circuloVerde.color = "lime";
                    circuloVerde.colorBorde = "white";
                    circuloVerde.crearArc(ctx);
                }, 100);
                break;

            case 3:
                botonMandoPulsado = 68;
                circuloAmarillo.color = "#eccd6a";
                circuloAmarillo.colorBorde = "yellow";
                circuloAmarillo.crearArc(ctx);
                setTimeout(function () {
                    circuloAmarillo.color = "yellow";
                    circuloAmarillo.colorBorde = "white";
                    circuloAmarillo.crearArc(ctx);
                }, 100);
                break;

            case 4:
                botonMandoPulsado = 90;
                circuloRosa.color = "pink";
                circuloRosa.colorBorde = "magenta";
                circuloRosa.crearArc(ctx);
                setTimeout(function () {
                    circuloRosa.color = "magenta";
                    circuloRosa.colorBorde = "white";
                    circuloRosa.crearArc(ctx);
                }, 100);
                break;
        }
        if (botonMandoPulsado !== null) {
            pulsado = botonMandoPulsado;
        } else {
            pulsado = null;
        }
        estadoBotones[id] = true;
    }
    estadoBotones[id] = false;

}

function leerValores() {
    const cc = navigator.getGamepads();
    const indices = Object.keys(controladores);

    for (let x = 0; x < indices.length; x++) {
        const botones = cc[indices[x]].buttons;
        for (let y = 0; y < botones.length; y++) {
            if (botones[y].pressed) {
                if (!estadoBotones[y]) {
                    botonPulsado(y);
                    estadoBotones[y] = true;
                }

            } else {
                delete estadoBotones[y];
            }
        }
    }
    if (indices.length > 0) {
        requestAnimationFrame(leerValores);
    }

}

window.addEventListener("gamepadconnected", function (e) {
    controladores[e.gamepad.index] = true;
    leerValores();

})

let empezar = false;

function start(id) {

    canciones[id].play();
    empezar = true;

    canciones[id].addEventListener("ended", function () {
        empezar = false;
        finCancion();
    })
    
    animar();
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarTablero();
    añadirNota();
    circuloRojo.crearArc(ctx);
    circuloAzul.crearArc(ctx);
    circuloVerde.crearArc(ctx);
    circuloAmarillo.crearArc(ctx);
    circuloRosa.crearArc(ctx);
    dibujarPuntos();
    mensajes();
    gameframe++;
    if (empezar) {
        requestAnimationFrame(animar);
    }

}


function pausarCancion(id) {
    parar.addEventListener("click", function () {
        if (!canciones[id].paused) {
            canciones[id].pause();
            empezar = false;
        } else {
            canciones[id].play();
            empezar = true;
            if (empezar) {
                requestAnimationFrame(animar);
            }
        }

    })

}


function stopCancion(id) {
    stop.addEventListener("click", function () {
        canciones[id].pause();
        canciones[id].currentTime = 0;
        empezar = false;
        finCancion();
    })
}

function reintentar(id) {

    reintento.addEventListener("click", function () {
        fin.style.display = 'none';
        score = 0;
        canciones[id].play();
        canciones[id].currentTime = 0;
        canvas.style.display = "block";
        empezar = true;
        animar();
    })
}

function finCancion() {

    h1.style.display = "none";
    form.style.display = "none";
    canvas.style.display = "none";
    fin.style.display = "block";
    puntos.textContent = score;

    if (score <= 0) {
        resultado.textContent =username+" Tienes que entrenar más."
    } else if (score <= 300) {
        resultado.textContent = username+" No lo has hecho TAN mal."
    } else if (score <= 600) {
        resultado.textContent = username+" Eres una promesa del Rock novata."
    } else if (score <= 900) {
        resultado.textContent = username+" eres una promesa del Rock."
    } else if (score <= 1200) {
        resultado.textContent =username+ " eres una Estrella del Rock."
    } else if (score > 2000) {
        resultado.textContent = username+" eres una Super Estrella del Rock."
    }


    volver.addEventListener("click", function () {
        fin.style.display = 'none';
        score = 0;
        empezar = false;
        location.reload();
    })
}