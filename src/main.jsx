import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ChakraProvider, createSystem, defaultConfig, defineConfig} from '@chakra-ui/react';
import App from './App.jsx'

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                accent: '#ff0a00'
            }, fonts: {
                body: "'Rubik', sans-serif", heading: "'Rubik', sans-serif"
            }
        }
    },
})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(<StrictMode>
    <ChakraProvider value={system}>
        <App/>
    </ChakraProvider>
</StrictMode>,)
