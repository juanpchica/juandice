const API_URL = 'https://pokeapi.co/api/v2/';
const POKEMON_URL = 'pokemon/:nombre';

//Hago request al api con jquery
//crossdomain
/*
saludoPokemon = data => {
	console.log("Hola "+ data.name+" Tienes de experiencia:"+data.base_experience);
}

function getPokemon(nombre){
	$.get(API_URL + POKEMON_URL.replace(':nombre', nombre),saludoPokemon)
}

getPokemon('pikachu');
getPokemon('bulbasaur');
getPokemon('charmander');
*/

///Promesas
// .then(val => ...) -> resuelta correctamente
// .catch(val => ...) -> error de resolucion

//Es un objeto de js, siempre le paso 
//new Promise(function(resolve,reject){

//}).then().catch()


function saludarPokemon(nombre){

	obtenerPokemon(nombre).then(function(pokemon){
		//Si el pokemon es obtenido correctamente, saludo
		console.log("Hola eres el pokemon "+pokemon.name+" y tu experiencia es de: "+pokemon.base_experience);
	})
	.catch(onError)
}

function obtenerPokemon(nombre){
	return new Promise(function(resolve,reject){
		//Traigo los pokemones mediante httprequest
		$
			//Si es correcta la consulta y exitosa, resuelvo la promesa
			.get(API_URL + POKEMON_URL.replace(':nombre', nombre),data => resolve(data))

			//Si falla la consulta con .get, reject la promesa
			.fail(function(){reject(nombre)})
	})
}

function onError(nombre){
	console.log("Sucedio un error al obtener el personaje: "+nombre);
}

//Ejecuto la funcion que tiene la promesa
//saludarPokemon("pikachuh")
//saludarPokemon("pikachu")


var nombresPokemones = ["pikachu","charmander","blastoise","beedrill","butterfree"];

var promesas = nombresPokemones.map(function(nombre) {
	saludarPokemon(nombre);
})

//Para usar await debemos usar async en la funcion 



//Cambiando contextos

const lis = {
    nombre: 'Lissette',
    apellido: 'Garzon'
}

const anton = {
    nombre: 'Antonio',
    apellido: 'Cortes'
}

function saludar(saludo = 'Hola'){
   console.log(`${saludo}, mi nombre es ${this.nombre}`)
}

// saludar(lis)  //esto da Hola, mi nombre es undefined

// const saludoLis = saludar.bind(lis) //no se ejecuta saludar hasta que llame a saludoLis que la referncia

const saludando = (persona,saludo) => saludar.bind(persona,saludo)

saludando(lis)()
saludando(anton, 'Hola che')()
setTimeout( ()=>saludando(anton, 'che')(),1000)

saludar.call(lis,'Hola wey') //parametros separados por coma

saludar.apply(anton, ['Hola amigo']) //parametros dentro de un arreglo separados por coma