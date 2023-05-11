import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BaseUser from '../views/BaseUser.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login/ok',
    redirect: '/userPage'
  },
  {
    path: '/userPage',
    name: 'userPage',
    component: BaseUser
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Se registra un guardia de ruta para manejar el diseño personalizado
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'defaultLayout';
  document.body.className = layout; // Establece el nombre de clase en el body según el diseño
  
  next();
});

export default router

