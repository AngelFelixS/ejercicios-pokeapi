const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const imagen = document.getElementById("image");
const nombre = document.getElementById("name");
const numero = document.getElementById("number");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const cardElement = document.getElementById("card");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

fetch(pokeAPI+getRandomNumber(1,1000))
    .then((response) => response.json())
    .then((pokemon)=>{
        nombre.textContent=pokemon.name
        numero.textContent=pokemon.id
        altura.textContent=pokemon.height+" altura"
        peso.textContent=pokemon.weight+" peso"
        imagen.src=pokemon.sprites.front_default

        let types=pokemon.types
        types.forEach(element => {
            let newButton = document.createElement("button");
            newButton.classList.add(element.type.name);
            newButton.innerText = element.type.name;
            cardElement.appendChild(newButton);
        });
    })

