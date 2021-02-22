import {
    UPDATE_POKEMONS,
    UPDATE_CURRENT_POKEMON_NAME,
} from '../constants'

const defaultState = {
    pokemons: undefined,
    currentNamePokemonSelected: undefined,
}

export default (state = defaultState, action) => {
    switch (action.type) {
    case UPDATE_POKEMONS:
        return {
            ...state,
            pokemons: [
                ...state.pokemons || [],
                ...action.payload,
            ]
        }
    case UPDATE_CURRENT_POKEMON_NAME: 
        return {
            ...state,
            currentNamePokemonSelected: action.payload,
        }
    default:
        return state
    }
}
