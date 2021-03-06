import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import PokemonList from '../../screens/PokemonList'
import PokemonPreview from '../../screens/PokemonPreview'

const RootRoutes = () => {
    const Stack = createStackNavigator()
    const currentPokemonNameSelected = useSelector(
        (state) => state.pokemon.currentNamePokemonSelected,
    )

    return (
        <Stack.Navigator
            initialRouteName="PokemonList"
        >
            <Stack.Screen
                name="PokemonList"
                component={PokemonList}
                options={{
                    title: 'Pokemons',
                }}
            />
            <Stack.Screen
                name="PokemonPreview"
                component={PokemonPreview}
                options={{
                    title: currentPokemonNameSelected,
                }}
            />
        </Stack.Navigator>
    )
}

export default RootRoutes
