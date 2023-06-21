import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonsList from "../components/pokedex/PokemonsList"

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const nameTrainer = useSelector(store => store.nameTrainer)

  const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(namePokemon.toLowerCase().trim()))

  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value)
  }

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE

    const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //The last page
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //current block
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    /* Pages in this block */

    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK

    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i)
      }
    }

    return {
      pokemonsInPage,
      lastPage,
      pagesInBlock
    }
  }

  const { lastPage, pagesInBlock, pokemonsInPage } = paginationLogic()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if (!currentType) {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

      axios
        .get(url)
        .then(({ data }) => setPokemons(data.results))
        .catch((error) => console.log(error))
    }

  }, [currentType])

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/type'

    axios
      .get(url)
      .then(({ data }) => setTypes(data.results))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {

    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`

      axios
        .get(url)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon)
          setPokemons(pokemonsByType)
        })
        .catch((error) => console.log(error))
    }


  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [namePokemon, currentType])
  

  return (
    <main>
      <Header />
      <p className="font-semibold p-2 max-w-[1024px] mx-auto px-4"><span className="text-[#FE1936]">Welcome {nameTrainer},</span> here you can find your favorite pokemon</p>

      <form onSubmit={handleSubmit} className="my-2 p-2 flex flex-wrap items-center gap-x-10 justify-center">
        <select onChange={handleChangeType} className="px-2 my-4 underline-none w-[220px]">
          <option value="" >All pokemon</option>
          {
            types.map((type) => (
              <option value={type.name} key={type.url}>{type.name}</option>
            ))
          }
        </select>

        <div>
          <input id="namePokemon" type="text" placeholder="Search a pokemon" autoComplete="off" className="py-2 px-4 w-[220px] outline-none shadow-lg" />
          <button className="p-2 text-white bg-[#D93F3F]">Search</button>
        </div>
      </form>

      

      <PokemonsList pokemons={pokemonsByName} pokemonsInPage={pokemonsInPage} />

      {/* Pagination */}
      <ul className="flex gap-2 justify-center py-4 px-2 flex-wrap">

        <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"><i className='bx bx-chevrons-left'></i></li>

        <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"><i className='bx bxs-chevron-left'></i></li>
        {
          pagesInBlock.map(numberpage => <li onClick={() => setCurrentPage(numberpage)} key={numberpage} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberpage === currentPage && "bg-red-400"}`}>{numberpage}</li>)
        }
        <li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"><i className='bx bxs-chevron-right'></i></li>

        <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"><i className='bx bx-chevrons-right'></i></li>

      </ul>
    </main>
  )
}
export default Pokedex