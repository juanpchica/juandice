//Elementos del dom
const btnEmpezar = document.getElementById("btnEmpezar");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");


//Creo la class del juego
class Juego{

	constructor(){
		this.inicializar();
		this.generarSecuencia();
	}

	inicializar(){
		btnEmpezar.classList.add('hide');
		this.nivel = 1
		this.colores = {
			celeste,
			violeta:violeta,
			naranja,
			verde
		}
	}

	generarSecuencia(){
		//Genero secuencia para el juego, creo un array con elementos aleatorios de 0 a 3
		this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
	}
}

function empezarJuego(){
	window.juego = new Juego();
}