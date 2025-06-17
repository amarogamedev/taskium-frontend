import {createRoot} from 'react-dom/client'
import {ChakraProvider, createSystem, defaultConfig, defineConfig} from '@chakra-ui/react';
import App from './App.jsx'

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                accent: '#0000FF',
                accent2: '#FF5700',
                accent3: '#FFD100',
                accent4: '#FF0C00',
            }, fonts: {
                body: "'Rubik', sans-serif",
                heading: "'Rubik', sans-serif"
            }
        }
    },
})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(
    <ChakraProvider value={system}>
        <App />
    </ChakraProvider>
)
