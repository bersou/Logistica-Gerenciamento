/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  
  // --- BLOCO DE TEMA ATUALIZADO ---
  theme: {
    defaultTheme: 'light', // Definimos 'light' como o tema padrão
    themes: {
      light: {
        dark: false, // Informa que este é um tema claro
        colors: {
          // Aqui está a nova cor primária
          primary: '#5E35B1', // Roxo Moderno (Deep Purple)

          // Cores padrão do Vuetify (podemos mantê-las)
          secondary: '#5CBBF6',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
  // --- FIM DA ATUALIZAÇÃO ---
})