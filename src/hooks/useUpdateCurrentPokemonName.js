import { useCallback } from 'react'
import { useDispatch } from 'react-redux' 
import { updateCurrentPokemonName } from '../store/actions'

const useUpdateCurrentPokemonName = () => {
    const distpatch = useDispatch()
    return useCallback((pokemonName) => {
        distpatch(updateCurrentPokemonName(pokemonName))
    }, [distpatch])
}

export default useUpdateCurrentPokemonName
