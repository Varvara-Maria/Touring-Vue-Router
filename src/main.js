import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import 'nprogress/nprogress.css'

// const GStore = reactive({ flashMessage: ''}) // create a global (reactive) object to share across multiple components

createApp(App)
  .use(router)
  .provide('GStore', GStore) // make this object available for components in our app to use (inject)
  .mount('#app')
