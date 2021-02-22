import { useCallback } from 'react'
import { useDispatch } from 'react-redux' 
import { updatePokemons } from '../store/actions'

const useUpdatePokemons = () => {
    const distpatch = useDispatch()
    return useCallback((pokemons) => {
        distpatch(updatePokemons(pokemons))
    }, [distpatch])
}

export default useUpdatePokemons
