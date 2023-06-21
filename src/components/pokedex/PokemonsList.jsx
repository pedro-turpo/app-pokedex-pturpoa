import PokemonCard from "./PokemonCard"

const PokemonsList = ({ pokemons, pokemonsInPage}) => {
    return (
        <section className="flex flex-wrap gap-4 mx-auto justify-center max-w-[1440px]">
            {
                pokemonsInPage.map((pokemon) => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
    )
}
export default PokemonsList