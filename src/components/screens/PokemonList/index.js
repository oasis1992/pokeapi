import React, { useState, useCallback } from 'react'
import { VirtualizedList } from 'react-native'
import {
    List,
} from 'native-base'
import Loading from '../../atoms/Loading'
import CenterTemplate from '../../templates/CenterTemplate'
import usePokemons from '../../../hooks/usePokemons'
import {
    Container
} from './style'
import PokemonItemCard from '../../molecules/PokemonItemCard'
import useUpdateCurrentPokemonName from '../../../hooks/useUpdateCurrentPokemonName'

const LIMIT_PER_PAGE = 20
const PokemonList = ({ navigation }) => {
    const [page, setPage] = useState(0)
    const updateCurrentPokemonName = useUpdateCurrentPokemonName()
    const { pokemons, loading } = usePokemons({
        currentPage: page,
        limit: LIMIT_PER_PAGE,
    })

    const getItemCount = (data) => data.length;

    const getItem = useCallback((data, index) => data[index], [])

    const renderFooter = useCallback(() => {
        if (loading) {
            return <Loading /> 
        }
        return null
    }, [loading])

    const fetchMore = useCallback(() => {
        setPage((prevState) => prevState + 1)
    }, [setPage])

    if (loading && !pokemons) {
        return (
            <CenterTemplate>
                <Loading />
            </CenterTemplate>
        ) 
    }

    return (
        <Container>
            <VirtualizedList
                data={pokemons || []}
                ListFooterComponent={renderFooter}
                onEndReached={fetchMore}
                enableEmptySections
                onEndReachedThreshold={1}
                renderItem={({ item }) => (
                    <List key={JSON.stringify(item.id)}>
                        <PokemonItemCard
                            title={`${item.name} peso: ${item.weight}kg`}
                            uriImage={item.image}
                            onPress={() => {
                                updateCurrentPokemonName(item.name)
                                navigation.push('PokemonPreview', { pokemonId: item.id })
                            }}
                        />
                    </List>
                    
                )}
                keyExtractor={item => JSON.stringify(item.id)}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </Container> 
    )
}

export default PokemonList
