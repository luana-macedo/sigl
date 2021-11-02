import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import router from './router'
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

Vue.component("v-select", vSelect);
Vue.use(VueMask);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
