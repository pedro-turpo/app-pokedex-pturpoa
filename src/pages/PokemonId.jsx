import { useParams } from "react-router-dom"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { pokeLinearGradiendts } from "../util/pokeLinearGradiendts"
import { pokeListColor } from "../util/pokeListColor"

const PokemonId = () => {

  const [pokemon, setPokemon] = useState(null)

  const { pokemonName } = useParams()

  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255
    return `${(baseStat * 100) / STAT_MAX}%`
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.log(error))
  }, [])

  console.log(pokemon)

  return (
    <main>
      <Header />

      <section className="px-4 py-20 border max-w-[1024px] mx-auto">

        {/* Informacion detalle de pokemon */}
        <article className="pt-6">
          {/* Secction img */}
            <div className={`boder-[10px] h-[110px] relative ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`}>
            <div className="absolute w-[230px] md:w-[300px] left-1/2 -translate-x-1/2 -bottom-4">
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
              </div>
          </div>
          
          {/* Info */}

          <article>
            <h3 className={`mt-2 text-[30px] text-center font-semibold ${pokeListColor[pokemon?.types[0].type.name]}`}>#{ pokemon?.id}</h3>
            <h3 className={`text-[30px] text-center font-semibold ${pokeListColor[pokemon?.types[0].type.name]}`}>{ pokemon?.name }</h3>
            
            <section className="flex gap-4 justify-center text-[12px]">
              <div className="p-2 text-center">
                <p>Peso</p>
                <span className="font-bold">69</span>
              </div>
              <div className="p-2 text-center">
                <p>altura</p>
                <span className="font-bold">7</span>
              </div>
            </section>

            <section className="flex gap-4 flex-wrap justify-center">
              <div className="bg-yellow-50">
                <div className="text-center pt-4 font-bold">
                  Tipo
                </div>
                <div className="flex gap-4 p-4 flex-wrap">
                  <p className="border p-1">Planta</p>
                  <p className="border p-1">Venenoso</p>
                </div>
              </div>

              <div className="bg-yellow-50">
                <div className="text-center pt-4 font-bold">
                  Habilidades
                </div>
                <div className="flex gap-4 p-4 flex-wrap">
                  <p className="border p-1">Crecimiento</p>
                  <p className="border p-1">Clorofila</p>
                </div>
              </div>
            </section>
          </article>


          {/* stats */}
          <section className="px-2">
            <h4 className="text-[25px] font-semibold py-4">Stats</h4>
            <section>
              {
                pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url} className="pb-3">
                    <section className="flex justify-between">
                      <h5 className="font-semibold text-sm">{stat.stat.name}</h5>
                      <span className="text-sm">{stat.base_stat}/255</span>
                    </section>
                    {/* Barra de progreso */}
                    <div className="bg-gray-300 h-6 rounded-sm overflow-hidden">
                      <div style={{ width: percentProgresStat(stat.base_stat) }} className={`h-full bg-yellow-500`}></div>
                    </div>

                  </article>
                ))
              }
            </section>
          </section>

          {/* Movements */}
          <section className="border">
            <h3 className="mt-2 mb-4 px-6 font-bold text-[25px]">Movements</h3>
            <article className="flex flex-wrap gap-3 px-6 justify-between">
              {
                pokemon?.moves.slice(0, 25).map((move) => (
                  <div key={move.move.url} className="border py-1 px-3 bg-[#E5E5E5] rounded-2xl">{move.move.name}</div>))
             }
            </article>
          </section>

        </article>


      </section>
    </main >
  )
}
export default PokemonId