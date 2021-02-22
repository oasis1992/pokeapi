import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, List, ListItem, Text, Left } from 'native-base';
import PokemonItemCard from '../PokemonItemCard';

const PokemonEvolutions = ({ evolutions }) => (
    <Container>
        <Content>
            <List>
                {
                    evolutions.map((evolution) => (
                        <PokemonItemCard
                            key={evolution.name}
                            title={evolution.name}
                            uriImage={evolution.imageUri}
                        />
                    ))
                }
            </List>
        </Content>
    </Container>
)

PokemonEvolutions.propTypes = {
    evolutions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUri: PropTypes.string.isRequired,
        }),
    ),
}

PokemonEvolutions.defaultProps = {
    evolutions: [],
}

export default PokemonEvolutions
