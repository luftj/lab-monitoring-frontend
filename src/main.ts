import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueCookies)

Vue.$cookies.config('30d');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
