import { createVuetify } from 'vuetify'
// import '@vuetifyjs/next/styles/index.css'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        primary: '#0E4BEF',
        secondary: '#e57373',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        success: '#4caf50'
      }
    }
  }
})
