import { useEffect, useState } from 'react'
import {
    getPokemonWithPagination
} from '../providers/pokeApi'
import useGetPokemons from './useGetPokemons'
import useUpdatePokemons from './useUpdatePokemons'

const usePokemons = ({
    currentPage,
    limit,
}) => {
    const [loading, setLoading] = useState(false)
    const updatePokemons = useUpdatePokemons()
    const pokemonsState = useGetPokemons()
    useEffect(() => {
        setLoading(true)
        getPokemonWithPagination(limit, currentPage).then((pokemons) => {
            const newPokemons = pokemons.map((pokemon) => ({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                abilities: pokemon.abilities,
                sprites: pokemon.sprites,
                weight: pokemon.weight,
            }))
            updatePokemons(newPokemons)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [
        updatePokemons,
        setLoading,
        currentPage,
        limit,
    ])

    return {
        loading,
        pokemons: pokemonsState,
    }
}

export default usePokemons
