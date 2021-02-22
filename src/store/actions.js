import {
    UPDATE_POKEMONS,
    UPDATE_CURRENT_POKEMON_NAME,
} from './constants'

export const updatePokemons = (payload) => ({
    type: UPDATE_POKEMONS,
    payload,
})

export const updateCurrentPokemonName = (payload) => ({
    type: UPDATE_CURRENT_POKEMON_NAME,
    payload,
})

