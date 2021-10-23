import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';

import './index.css' // Tailwind CSS
import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2
import es from 'vee-validate/dist/locale/es.json' // VeeValidate Localization es
import { required, email, confirmed, min, alpha } from 'vee-validate/dist/rules'; // VeeValidate Rules
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2, options);