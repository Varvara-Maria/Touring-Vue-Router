import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from "../views/event/Details.vue"
import EventLayout from '../views/event/Layout.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) { // if the event doesn`t exist, load 404
            return ({ // if undefined event show NotFound page
              name: '404Resource',
              params: { resource: 'event' }
            })
          } else {
            return ({ name: "NetworkError" }) // otherwise assume network error
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catch(.*)', // Match all routes that do not match an existing route
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource', // We will use /404/event
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error', // We will see NetworkError page
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  NProgress.start();
})

router.afterEach(() => {
  NProgress.done();
})

export default router
