import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // For this example we are just using the default root, but you could do something like
      // path: '/company/:company_uid'. The idea being that you load the model that you want to use
      // with the form by grabbing the compamny_uid from the route params.
      path: '/',
      // You can play around with the paths to the files however you like. Just find something that
      // works for your use case
      component: () => import(/* webpackChunkName: "address-example" */ './views/models/address/AddressRoot.vue'),
      children: [
        {
          path: '',
          name: 'EditAddress',
          props: (route) => ({
            cancelRoute: {
              // Left this in as an example. Obviously change this as required
              name: 'company.dashboard',
              // params: {company_uid: route.params.company_uid}
            },
            // This is just a way of overriding the method used for the api call. You can extend
            // this to support all sorts of options
            apiMethod: 'PUT'
          }),
          component: () => import(/* webpackChunkName: "address-example" */ '@/views/models/address/EditAddress.vue'),
        }
      ]
    },
  ],
});
