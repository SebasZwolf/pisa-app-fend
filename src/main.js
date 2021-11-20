import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';
import VueCountdown from '@chenfengyuan/vue-countdown';
const moment = require('moment')
require('moment/locale/es')

import './index.css' // Tailwind CSS
import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2
import es from 'vee-validate/dist/locale/es.json' // VeeValidate Localization es
import { required, email, confirmed, min, alpha, required_if, max, alpha_spaces, min_value, max_value, alpha_num } from 'vee-validate/dist/rules'; // VeeValidate Rules
import store from './store'; // Vuex Store

Vue.config.productionTip = false

// SweetAlert2 Options
const options = {
  confirmButtonColor: '#FF8844',
};

// VeeValidate
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('es', es);

extend('required', required);
extend('email', email);
extend('confirmed', confirmed);
extend('min', min);
extend('alpha', alpha);
extend('required_if', required_if);
extend('max', max);
extend('alpha_spaces', alpha_spaces);
extend('min_value', min_value);
extend('max_value', max_value);
extend('alpha_num', alpha_num);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2, options);
Vue.component(VueCountdown.name, VueCountdown);
Vue.use(require('vue-moment'), {
  moment
});