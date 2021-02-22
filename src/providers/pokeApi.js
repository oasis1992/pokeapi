import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

const getUriMainPicture = (sprites) => {
    if (!sprites || typeof sprites !== 'object') {
        return null
    }
    return Object.keys(sprites).map((key) => sprites[key])[0]
}

const formatSprites = (sprites) => {
    if (!sprites || typeof sprites !== 'object') {
        return []
    }
    return Object.keys(sprites).map((key) => {
        if (sprites[key] === null || typeof sprites[key] === 'object') {
            return undefined
        }

        return {
            name: key.split('_').join(' '),
            url: sprites[key],
        }
    }).filter((sprite) => !!sprite)
}

const formatAbilities = (abilities) => {
    if (!Array.isArray(abilities)) {
        return []
    }

    return abilities.map((item) => ({
        name: item.ability.name,
        url: item.ability.url,
    }))
}

const formatEvolutions = ({
    evolvesTo,
    specie,
}) => {
    const evolutions = (evolvesTo || []).reduce((acum, evolutionChain) => [
        ...acum,
        {
            id: specie.name,
            name: specie.name,
        },
        ...formatEvolutions({
            specie: evolutionChain.species,
            evolvesTo: evolutionChain.evolves_to,
        }),
    ], [])

    if (!evolutions.length) {
        return [{
            id: specie.name,
            name: specie.name,
        }]
    }

    return evolutions
}

const getPokemonDetails = async (pokemonName) => {
    const uri = `${API_URL}/pokemon/${pokemonName}`
    const response = await axios.get(uri)
    if (typeof response.data !== 'object') {
        throw new Error(`Unexpected response ${uri}`)
    }
    return response.data
}

const getEvolutionChain = async (uri) => {
    const response = await axios.get(uri)
    if (typeof response?.data !== 'object') {
        throw new Error(`Unexpected response ${uri}`)
    }

    if (!response) {
        throw new Error(`Unexpected response ${uri}`)
    }

    if (response.status !== 200) {
        throw new Error(`Unexpected response ${uri} status code: ${response.status}`)
    }

    return response.data?.chain
}

export const getEvolutions = async (pokemonId) => {
    const uri = `${API_URL}/pokemon-species/${pokemonId}`
    const response = await axios.get(uri)
    if (typeof response?.data !== 'object') {
        throw new Error(`Unexpected response ${uri}`)
    }

    if (!response.data.evolution_chain) {
        throw new Error(`Unexpected response ${uri} evolution_chain undefined`)
    }

    if (typeof response.data.evolution_chain !== 'object') {
        throw new Error(`Unexpected response ${uri} evolution_chain is not a object`)
    }

    const evolutionChainResponse = await getEvolutionChain(response.data.evolution_chain.url)

    if (!evolutionChainResponse) {
        return []
    }

    const evolutions = formatEvolutions({
        specie: evolutionChainResponse.species,
        evolvesTo: evolutionChainResponse.evolves_to,
    })

    const newEvolutions = await Promise.all(evolutions.map(async (evolution) => {
        const pokemonDetail = await getPokemonDetails(evolution.name)
        return {
            ...evolution,
            imageUri: getUriMainPicture(pokemonDetail.sprites),
        }
    }))

    return newEvolutions
}

export const getPokemonWithPagination = async (limit = 20, currentPage = 0) => {
    const uri = `${API_URL}/pokemon?limit=${limit}&offset=${currentPage * limit}`
    const response = await axios.get(uri)

    let newResults = response.data.results
    if (Array.isArray(newResults) && newResults.length) {
        newResults = await Promise.all(newResults.map(async (pokemon) => {
            const pokemonDetail = await getPokemonDetails(pokemon.name)

            if (!pokemonDetail || typeof pokemonDetail !== 'object') {
                return undefined
            }

            return {
                ...pokemonDetail,
                image: getUriMainPicture(pokemonDetail.sprites),
                abilities: formatAbilities(pokemonDetail.abilities),
                sprites: formatSprites(pokemonDetail.sprites),
                weight: pokemonDetail.weight || 'unknown',
            }
        }).filter((pokemon) => !!pokemon))

        return newResults
    }
    throw new Error(`Unexpected response ${uri}`)
}
