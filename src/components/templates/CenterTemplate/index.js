import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './style'

const CenterTemplate = ({
    children,
}) => (
    <Container>
        {children}
    </Container>
)

CenterTemplate.propTypes = {
    children: PropTypes.node,
}

export default CenterTemplate
