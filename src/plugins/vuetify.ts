import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#78909c',
        secondary: '#a7c0cd',
        anchor: '#4b636e'
      }
    }
  }
})
