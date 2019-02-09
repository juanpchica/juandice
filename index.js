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

		//Paso a siguiente nivel
		this.siguienteNivel();
	}

	inicializar(){
		btnEmpezar.classList.add('hide');
		this.nivel = 1;
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

	//Paso al siguiente nivel si es valido
	siguienteNivel(){
		this.iluminarSecuencia();
	}

	//Convierto numero de secuencia en un color
	transformarNumeroAColor(numero){
		switch (numero) {
			case 0:
				return 'celeste';
			case 1:
				return 'violeta';
			case 2:
				return 'naranja';
			case 3:
				return 'verde';
		}
	}

	iluminarSecuencia(){
		for(let i = 0; i < this.nivel; i++){

			//Transformo el numero de secuencia en un color
			let color = this.transformarNumeroAColor(this.secuencia[i]);
			
			//Ilumino el color cada 1 segundo y va sumando
			setTimeout(()=>this.iluminarColor(color), 1000*i);
		}
	}

	//ilumino un color y lo apago despues de cierto tiempo
	iluminarColor(color){
		this.colores[color].classList.add('light');

		//Apago el color despues de 350ms
		setTimeout(() => this.apagarColor(color),350);
	}

	apagarColor(color){
		this.colores[color].classList.remove('light');
	}


}

function empezarJuego(){
	window.juego = new Juego();
}