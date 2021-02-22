import { useState, useEffect } from 'react'
import { getEvolutions } from '../providers/pokeApi'

const useEvolutionsByPokemon = (pokemonId) => {
    const [loading, setLoading] = useState(false)
    const [evolutions, setEvolutions] = useState([])

    useEffect(() => {
        setLoading(true)
        getEvolutions(pokemonId).then((newEvolutions) => {
            setEvolutions(newEvolutions)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [
        pokemonId,
        setEvolutions,
        setLoading,
    ])

    return {
        loading,
        evolutions,
    }
}

export default useEvolutionsByPokemon
