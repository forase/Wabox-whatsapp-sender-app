import { createRouter, createWebHistory } from 'vue-router';

import AppLogin from './../components/AppLogin.vue'
import AppLayout from './../components/AppLayout.vue'
import AppCollectionList from './../components/AppCollectionList.vue'
import AppCollectionData from './../components/AppCollectionData.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/collections',
        meta: {
          auth: true // A protected route
        },
      },
      {
        path: 'collections',
        name: 'collections',
        component: AppCollectionList,
        meta: {
          auth: true // A protected route
        },
      },
      {
        path: 'collections/:id',
        name: 'contacts',
        component: AppCollectionData,
        meta: {
          auth: true // A protected route
        },
      },
    ],
    meta: {
      auth: true // A protected route
    },
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/', },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title;
  const isUserLoggedIn = JSON.parse(localStorage.login);
  console.log(isUserLoggedIn);
  if (to.meta.auth && !isUserLoggedIn) {
    console.log("is not logged in");
    next('/login')
  }
  else {
    console.log("is logged in");
    next()
  }
})

export default router;
