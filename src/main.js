import Vue from 'vue';
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue';
import router from './router';
import NotificationBus from '@/components/NotificationBus'

Vue.config.productionTip = false;

Vue.use(Vuetify)
Vue.use(Vuelidate)
// This is a way of having a global bus for notification events. Keeps the component logic simpler
Vue.prototype.$notifications = NotificationBus

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
