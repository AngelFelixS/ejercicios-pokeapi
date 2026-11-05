const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const imagen = document.getElementById("image");
const nombre = document.getElementById("name");
const numero = document.getElementById("number");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const cardElement = document.getElementById("card");
const boton = document.getElementById("boton")
const tipos=document.getElementById("tipos")
const input=document.getElementById("nombre")

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPokemon(){
    fetch(pokeAPI+input.value)
        .then((response) => response.json())
        .then((pokemon)=>{
            nombre.textContent=pokemon.name
            numero.textContent=pokemon.id
            altura.textContent=parseFloat(pokemon.height)/10+" m"
            peso.textContent=parseFloat(pokemon.weight)/10+" kg"
            imagen.src=pokemon.sprites.front_default

            let types=pokemon.types
            tipos.innerHTML=""
            types.forEach(element => {
                let newButton = document.createElement("button");
                newButton.classList.add(element.type.name);
                newButton.innerText = element.type.name;
                tipos.appendChild(newButton);
            });
        })
}

boton.addEventListener("click",getPokemon)
