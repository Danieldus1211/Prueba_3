// ### VARIABLES ###

// Array de palabras
var palabras = [["capacitor", "Almacena carga"], ["corriente", "Aumenta con el voltaje"], ["resistencia", "Reduce la corriente"], ["transistor", "Dispositivo semiconductor que controla o amplifica el flujo de corriente en un circuito"], ["diodo", "Componente electrónico que permite el flujo de corriente en una dirección"], ["amplificador", "Circuito electrónico que amplifica la diferencia de potencial entre sus entradas"], ["oscilador", "Circuito que produce una señal periódica"], ["filtro", "Circuito que atenúa o elimina ciertas frecuencias de una señal eléctrica"], ["fuente", "Circuito que proporciona energía eléctrica a otros dispositivos"], ["adc", "Dispositivo que convierte una señal analógica en una señal digital"], ["dac", "Dispositivo que convierte una señal digital en una señal analógica"], ["sensor", "Dispositivo que detecta y responde a estímulos"], ["actuador", "Dispositivo que convierte una señal eléctrica en una acción física"], ["pcb", "Placa que sostiene y conecta componentes electrónicos en un circuito impreso"], ["rele", "Dispositivo electromecánico que controla un circuito eléctrico mediante un interruptor"], ["interruptor", "Dispositivo que interrumpe o permite el flujo de corriente en un circuito"], ["modulacion", "El proceso de modificar una señal portadora para transportar información"], ["router", "Un dispositivo de red que dirige el tráfico de datos entre redes"], ["antena", "Un dispositivo que transmite y recibe señales electromagnéticas"], ["Switch", "Un dispositivo de red que conecta varios dispositivos en una red"]];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  // Genera un indice aleatorio
  rand = (Math.random() * 19).toFixed(0);

  // Selecciona el indice con la palabra y la vuelve mayuscula
  palabra = palabras[rand][0].toUpperCase();

  //console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "Felicidades !!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();
