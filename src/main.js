import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'

const GStore = reactive({ flashMessage: ''}) // create a global (reactive) object to share across multiple components

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore) // make this object available for components in our app to use (inject)
  .mount('#app')
