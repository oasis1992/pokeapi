import {
    Body, Left, ListItem, Text, Thumbnail,
} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'

const PokemonItemCard = ({
    onPress,
    uriImage,
    title,
}) => (
    <ListItem
        thumbnail
        style={{
            backgroundColor: 'white',
            height: 80,
        }}
        onPress={onPress}
    >
        {
            uriImage && (
                <Left>
                    <Thumbnail square source={{ uri: uriImage }} />
                </Left>
            )
        }

        <Body>
            <Text>{title}</Text>
        </Body>
    </ListItem>
)

PokemonItemCard.propTypes = {
    onPress: PropTypes.func,
    uriImage: PropTypes.string,
    title: PropTypes.string.isRequired,
}

PokemonItemCard.defaultProps = {
    onPress: undefined,
    uriImage: undefined,
}

export default PokemonItemCard
