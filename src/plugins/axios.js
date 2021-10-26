import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'http://api-sig-itpac-84633.herokuapp.com'
        })
    }
})