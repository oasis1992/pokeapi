import React from 'react'
import PropTypes from 'prop-types'
import {
    Container, Content, List, ListItem, Text, Left,
} from 'native-base'

const PokemonAbilities = ({ abilities }) => (
    <Container>
        <Content>
            <List>
                {
                    abilities.map((ability) => (
                        <ListItem key={ability.name}>
                            <Left>
                                <Text>{ability.name}</Text>
                            </Left>
                        </ListItem>
                    ))
                }
            </List>
        </Content>
    </Container>
)

PokemonAbilities.propTypes = {
    abilities: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ),
}

PokemonAbilities.defaultProps = {
    abilities: [],
}

export default PokemonAbilities
