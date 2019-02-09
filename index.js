//Elementos del dom
const btnEmpezar = document.getElementById("btnEmpezar");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const ULTIMO_NIVEL = 5;

//Creo la class del juego
class Juego{

	constructor(){
		this.inicializar();
		this.generarSecuencia();

		//Paso a siguiente nivel
		setTimeout(this.siguienteNivel.bind(this),500)
	}

	inicializar(){
		this.elegirColor = this.elegirColor.bind(this); //Sigo en el contexto de this, y no en el this del evento
		this.toggleBtnEmpezar()
		this.nivel = 1;
		this.colores = {
			celeste,
			violeta:violeta,
			naranja,
			verde
		}
	}

	toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }

	generarSecuencia(){
		//Genero secuencia para el juego, creo un array con elementos aleatorios de 0 a 3
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
	}

	//Paso al siguiente nivel si es valido
	siguienteNivel(){

		//Variable que me almacena el subnivel del nivel en el que estoy
		this.subnivel = 0;
		this.iluminarSecuencia();
		this.agregarEventosClick();
	}

	//Agrego eventos de click a mis elementos
	agregarEventosClick(){
		this.colores.celeste.addEventListener('click', this.elegirColor)
		this.colores.violeta.addEventListener('click', this.elegirColor)
		this.colores.naranja.addEventListener('click', this.elegirColor)
		this.colores.verde.addEventListener('click', this.elegirColor)
	}

	quitarEventosClick(){
		this.colores.celeste.removeEventListener('click', this.elegirColor);
		this.colores.violeta.removeEventListener('click', this.elegirColor);
		this.colores.naranja.removeEventListener('click', this.elegirColor);
		this.colores.verde.removeEventListener('click', this.elegirColor);
	}

	//Elijo color 
	elegirColor(ev){
		const color = ev.target.dataset.color;
		const numero = this.transformarColorANumero(color);

		//Ilumino el color en el que doy click
		this.iluminarColor(color);

		if(numero === this.secuencia[this.subnivel]){
			this.subnivel++;
			
			//Si ya cumpli con la secuencia, paso al siguiente nivel
			if(this.subnivel == this.nivel){
				this.nivel++;

				//Como ya llegue a cumplir la secuencia, quito el evento click y veo la nueva secuencia
				this.quitarEventosClick();
				
				//Si ya era el ultimo nivel, gana
				if(this.nivel == (ULTIMO_NIVEL+1)){
					this.ganoElJuego();
				}else{
					setTimeout(this.siguienteNivel.bind(this),1500);
				}
			}

		}else{
			this.perdioElJuego();

		}
	}

	ganoElJuego(){
		swal("Ganaste el juego", "Felicitacionas has ganado el juego", "success")
		.then(this.inicializar.bind(this))
	}

	perdioElJuego(){
		swal("Perdiste", "Lo sentimos has perdido el juego", "error")
		.then(()=>{
			this.quitarEventosClick();
			this.inicializar().bind(this);
		})

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

	//Convierto color a numero
	transformarColorANumero(color){
		switch (color) {
			case 'celeste':
				return 0;
			case 'violeta':
				return 1;
			case 'naranja':
				return 2;
			case 'verde':
				return 3;
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