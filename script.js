const pokemonContainer = document.getElementById("container");
const showMore = document.getElementById("show-more");
const showLess = document.getElementById("show-less");
let page = 1;
const postsPerPage = 10;
const searchInput = document.querySelector(".find-poke")
let allPokemon =[];
let isSearching = false;

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim()
})



const getPokemon = async () => {
    pokemonContainer.innerHTML = '';
    const skip = (page - 1) * postsPerPage;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${skip}`)
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

 showMore.addEventListener("click", () => {
    page++;
    getPokemon();
    updateButtons();
})

showLess.addEventListener("click", () => {
    if (page > 1) {
        page--;
        getPokemon();
        updateButtons();
    }
})

function updateButtons() {
   
    showLess.disabled = (page === 1);
    

}

 

getPokemon()