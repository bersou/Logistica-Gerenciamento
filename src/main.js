/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// --- 1. IMPORTAR O PINIA ---
import { createPinia } from 'pinia'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// --- 2. CRIAR A INSTÂNCIA DO PINIA ---
const pinia = createPinia()

// Styles
import 'unfonts.css'
import "leaflet/dist/leaflet.css";


const app = createApp(App)

registerPlugins(app)

// --- 3. DIZER AO APP PARA USAR O PINIA ---
app.use(pinia)

app.mount('#app')