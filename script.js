const pokeCardTemplate = document.querySelector("[poke-template]")
const pokeContainer = document.querySelector("[poke-cards-container]")
const searchInput =document.querySelector("[data-search]")

let allPokemon = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    allPokemon.forEach(pokemon => {
        const isVisible = pokemon.name.toLowerCase().includes(value)
        pokemon.element.classList.toggle("hide", !isVisible)
    })
})


async function getPokemon() {
const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
const data = await response.json()

const pokemonData = await Promise.all(
    data.results.map(pokemon => 
        fetch(pokemon.url).then (res => res.json())
    )
)

allPokemon = pokemonData.map(pokemon => {
    const card = pokeCardTemplate.content.cloneNode(true).children[0]

    const name = card.querySelector("[poke-name]")
    const image = card.querySelector("[poke-image]")
    const type = card.querySelector("[poke-type]")
    const height = card.querySelector("[poke-type]")
    name.textContent = pokemon.name
    image.src = pokemon.sprites.front_default
    image.alt = pokemon.name
    type.textContent = pokemon.type
    height.textContent = `Height ${pokemon.height}m`
    pokeContainer.append(card)
    return {
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.type,
        height: pokemon.height,
        element: card 
    }


})

}


getPokemon()


