import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, List, ListItem, Text, Left } from 'native-base';
import PokemonItemCard from '../PokemonItemCard';

const PokemonSprites = ({ sprites }) => (
    <Container>
        <Content>
            <List>
                {
                    sprites.map((sprite) => (
                        <PokemonItemCard
                            key={sprite.name}
                            title={sprite.name}
                            uriImage={sprite.url}
                        />
                    ))
                }
            </List>
        </Content>
    </Container>
)

PokemonSprites.propTypes = {
    sprites: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ),
}

PokemonSprites.defaultProps = {
    sprites: [],
}

export default PokemonSprites
