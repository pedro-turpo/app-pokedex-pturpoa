import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { pokeLinearGradiendts } from "../../util/pokeLinearGradiendts.js"
import { pokeListColor } from "../../util/pokeListColor.js"

const PokemonCard = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)

        const titleTypes = nameTypes.join(" / ")

        return titleTypes
    }

    useEffect(() => {
        const url = pokemonUrl

        axios
            .get(url)
            .then(({ data }) => setPokemon(data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <Link to={`/pokedex/${pokemon?.name}`}>
            {/* Seccion superior */}
            <section className={` p-3 rounded-2xl ${pokeLinearGradiendts[pokemon?.types[0].type.name]} w-[300px] mx-auto`}>
                <section className={`relative h-[130px] ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`}>

                    <div className="absolute px-12 -bottom-20">
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                    </div>

                </section>

                {/* Seccion inferior */}
                <section className="bg-white pt-[70px] text-center">
                    <h3 className={`${pokeListColor[pokemon?.types[0].type.name]} text-[28px] font-semibold`}>{pokemon?.name}</h3>
                    <h5 className="font-semibold">{formatTypesPokemon(pokemon?.types)}</h5>
                    <p className="mt-2 text-gray-500 pb-1 text-sm">Type</p>
                    <hr />

                    
                    <section className="grid grid-cols-2 p-1">
                        {/* Stats */}
                        {
                            pokemon?.stats.slice(0, 4).map((stat) => (
                                <article key={stat.stat.url} className="p-2">
                                        <div className="text-sm text-gray-500 pb-1">{stat.stat.name}</div>
                                        <div className={`text-lg font-semibold ${pokeListColor[pokemon?.types[0].type.name]}`}>{stat.base_stat}</div>
                                </article>
                            ))
                        }

                    </section>
                </section>
            </section>
        </Link>
    )
}
export default PokemonCard