import React, { useState, useMemo } from 'react'
import {
    Container, Button, Segment, Content, Text,
} from 'native-base'
import PokemonAbilities from '../../molecules/PokemonAbilities'
import useGetPokemons from '../../../hooks/useGetPokemons'
import PokemonSprites from '../../molecules/PokemonSprites'
import PokemonEvolutions from '../../molecules/PokemonEvolutions'
import useEvolutionsByPokemon from '../../../hooks/useEvolutionsByPokemon'
import CenterTemplate from '../../templates/CenterTemplate'
import Loading from '../../atoms/Loading'

const PokemonPreview = ({ route }) => {
    const pokemonId = route?.params?.pokemonId
    const { evolutions, loading } = useEvolutionsByPokemon(pokemonId)
    const pokemons = useGetPokemons()
    const newPokemon = useMemo(() => pokemons
        .find((pokemon) => pokemon.id === pokemonId), [pokemonId, pokemons])

    const [tabActive, setTabActive] = useState(0)

    if (!newPokemon) {
        return <Text>Pokemon not found</Text>
    }

    return (
        <Container>
            <Segment>
                <Button
                    onPress={() => setTabActive(0)}
                    active={tabActive === 0}
                    first
                >
                    <Text>Habilidades</Text>
                </Button>
                <Button
                    onPress={() => setTabActive(1)}
                    active={tabActive === 1}
                >
                    <Text>Sprites</Text>
                </Button>
                <Button
                    last
                    onPress={() => setTabActive(2)}
                    active={tabActive === 2}
                >
                    <Text>Evolutions</Text>
                </Button>
            </Segment>
            <Content padder>
                { tabActive === 0 && (
                    <PokemonAbilities abilities={newPokemon.abilities} />
                ) }

                { tabActive === 1 && (
                    <PokemonSprites sprites={newPokemon.sprites} />
                ) }

                { tabActive === 2 && !loading && (
                    <PokemonEvolutions evolutions={evolutions} />
                ) }

                { tabActive === 2 && loading && (
                    <CenterTemplate>
                        <Loading />
                    </CenterTemplate>
                ) }
            </Content>
        </Container>
    )
}

export default PokemonPreview
