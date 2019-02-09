const API_URL = 'https://pokeapi.co/api/v2/';
const POKEMON_URL = 'pokemon/:nombre';

//Hago request al api con jquery
//crossdomain

saludoPokemon = data => {
	console.log("Hola "+ data.name+" Tienes de experiencia:"+data.base_experience);
}

function getPokemon(nombre){
	$.get(API_URL + POKEMON_URL.replace(':nombre', nombre),saludoPokemon)
}

getPokemon('pikachu');
getPokemon('bulbasaur');
getPokemon('charmander');