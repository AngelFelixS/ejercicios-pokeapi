const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=";
const boton = document.getElementById("boton")
const boton2 = document.getElementById("boton2")
const resultado=document.getElementById("resultado")

let siguiente=""
let anterior=""


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getPokemon(url){
    let response
    if (url==""){
        response=await fetch(pokeAPI+"0")
    } else {
        response=await fetch(url)
    }
    
    if (response.ok){
        resultado.innerHTML=""
        const json=await response.json()
        const pokemons=json.results
        

        for (let i = 0; i < pokemons.length; i++) {
            const div=document.createElement("div")
            const imagen = document.createElement("img")
            const nombre = document.createElement("h1")
            const numero = document.createElement("h3")
            const altura = document.createElement("p")
            const peso = document.createElement("p")
            const tipos=document.createElement("div")

            nombre.textContent="Cargando..."
            numero.textContent=""
            altura.textContent=""
            peso.textContent=""
            imagen.src="./pokeball.png"
            tipos.innerHTML=""
            div.classList="card"

            let fetchpokemon=await fetch(pokemons[i].url)
            let pokemon=await fetchpokemon.json()

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

            div.append(imagen,nombre,numero,altura,peso,tipos)
            resultado.appendChild(div)
        }
        siguiente=json.next
        anterior=json.previous
        if (anterior!=null){
            boton2.hidden=false
        } else {
            boton2.hidden=true
        }
    }
}

function onclick(evento){
    if (evento.target.id=="boton"){
        getPokemon(siguiente)
    } else {
        getPokemon(anterior)
    }
    
}

boton.addEventListener("click",onclick)
boton2.addEventListener("click",onclick)
