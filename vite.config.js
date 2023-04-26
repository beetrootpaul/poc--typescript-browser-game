import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        // docs: https://rollupjs.org/configuration-options/
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
})
