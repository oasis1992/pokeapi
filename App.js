import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as ReduxProvider } from 'react-redux'
import RootRoutes from './src/components/organisms/RootRoutes'
import store from './src/store'

const App = () => (
    <NavigationContainer>
        <ReduxProvider store={store}>
            <RootRoutes />
        </ReduxProvider>
    </NavigationContainer>
)

export default App
