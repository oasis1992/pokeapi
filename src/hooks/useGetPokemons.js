import { useSelector } from 'react-redux'

const useGetPokemons = () => useSelector((state) => state.pokemon.pokemons)

export default useGetPokemons
