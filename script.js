const pokemonContainer = document.getElementById("container")

async function getPokemon() {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const pokeData = await response.json();
    

    for (const poke of pokeData.results) {
        const infoResponse = await fetch(poke.url)
        const infoData = await infoResponse.json();


        const container = document.createElement("container")
        container.className = "poke-card";
       
        const content = document.createElement("div")
        content.className = "poke-text"
        container.innerHTML = `
        <h1>${poke.name.charAt(0).toUpperCase()}${poke.name.slice(1)} </h1>
        <img class="poke-sprite" src ="${infoData.sprites.front_default}" alt="${poke.name}">
        
        `;
        
    pokemonContainer.appendChild(container);
    }

    
}

getPokemon()