'use strict';

var h1=document.getElementById("titulo");
var form=document.getElementById("formulario");
var select=document.getElementById("select");
var popup=document.getElementById("popup");
var fin=document.getElementById("fin");
var btn1=document.getElementById("btn1");
var stop=document.getElementById("stop");
var parar=document.getElementById("parar");
var puntos=document.getElementById("score");
var reintento=document.getElementById("reintentar");
var volver=document.getElementById("volver");
var resultado=document.getElementById("resultado");

var users=[];
var usuarios="model/usuarios.json";
const audio=new Audio("/assets/music/intro.mp3");

function cargarUsuarios(usuarios){

fetch(usuarios).then(response=>response.json())
.then(data=>{
  localStorage.setItem("usuarios",JSON.stringify(data))
  console.log(localStorage.getItem("usuarios"))
});
};

cargarUsuarios(usuarios);
let username="";
function iniciarSesion(){
  username=document.getElementById("username").value;
  let contraseña=document.getElementById("password").value;

  users=JSON.parse(localStorage.getItem("usuarios"));
  
  let existe=false;

  for (let x =0; x < users.length; x++) {

    if(users[x].usuario === username && users[x].contraseña === contraseña){
       
       existe=true;
       break;
    }
  };

  if (existe) {
    h1.style.display="none";
    form.style.display="none";
    select.style.display="block";
    let bienvenido=document.createElement("h3");
    bienvenido.textContent="¡Bienvenido "+username+"!";
    bienvenido.classList.add("bienvenido");
    document.body.appendChild(bienvenido);
    audio.play();
    setTimeout(function(){
      document.body.removeChild(bienvenido);
    },5000);
    
} else {

  let pattern = /[¡"',.:;<>¿[\]_`{}!@#$%^&*()_\-+=]/;
  let coincidencias = contraseña.match(pattern);
  if(coincidencias){
    let mensajeError=document.createElement("div");
    mensajeError.textContent="La contraseña contiene el caracter especial "+"'"+coincidencias[0]+"'";
    mensajeError.classList.add("mensajeError");
    document.body.appendChild(mensajeError);

    setTimeout(function(){
      document.body.removeChild(mensajeError);
    },2500);
  }else{
    let mensajeError=document.createElement("div");
    mensajeError.textContent="Nombre de usuario o contraseña incorrectos, prueba de nuevo.";
    mensajeError.classList.add("mensajeError");
    document.body.appendChild(mensajeError);

    setTimeout(function(){
      document.body.removeChild(mensajeError);
    },2500);
  }
}
};

function mostrarContraseña(){

let password=document.getElementById("password");
let checkbox=document.getElementById("mostrar");

if(checkbox.checked){
  password.type="text";
}else{
  password.type="password";
}
};

function jugar(id){
 audio.pause();
 audio.currentTime=0;
 select.style.display="none";
 canvas.style.display="block";
 start(id);
 pausarCancion(id);
 stopCancion(id);
 reintentar(id);
}

function verCanciones(){
  
  h1.style.display="none";
  form.style.display="none";
  canvas.style.display="none";
  select.style.display="block";
  audio.play(); 
}

function popUp(){
  popup.style.display="block";
  btn1.addEventListener("click",function(){
    popup.style.display = 'none';
  })
 
}

