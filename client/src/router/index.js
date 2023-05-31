import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BaseUser from '../views/BaseUser.vue'
import Screening from '../views/Screening'
import PreguntaInicialVue from '../views/PreguntaInicial.vue'
import DinamicsQuestionsVue from '../views/DinamicsQuestions.vue'
import FundamentosVue from '../views/Fundamentos.vue'
import DirectivasVue from '../views/Directivas.vue'
import MetodosVue from '../views/Métodos.vue'
import EventosVue from '../views/Eventos.vue'
import ComponentesVue from '../views/Componentes.vue'
import PlantillasVue from '../views/Plantillas.vue'
import RoutingVue from '../views/Routing.vue'
import WatchersVue from '../views/Watchers.vue'
import AnimationVue from '../views/Animation.vue'
import BuildVue from '../views/Build.vue'
import DeploymentVue from '../views/Deployment.vue'

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
  {
    path: '/initialQuestion',
    name: 'initialQuestion',
    component: PreguntaInicialVue
  },
  {
    path: '/screening',
    name: 'screening',
    component: Screening
  },
  {
    path: '/logout',
    name: 'logout',
    component: Home
  },
  {
    path: '/chat',
    name: 'chat',
    component: DinamicsQuestionsVue
  },
  {
    path: '/Fundamentos',
    name: 'Fundamentos',
    component: FundamentosVue
  },
  {
    path: '/Directivas',
    name: 'Directivas',
    component: DirectivasVue
  },
  {
    path: '/Metodos',
    name: 'Métodos',
    component: MetodosVue
  },
  {
    path: '/Eventos',
    name: 'Eventos',
    component: EventosVue
  },
  {
    path: '/Componentes',
    name: 'Componentes',
    component: ComponentesVue
  },
  {
    path: '/Plantillas',
    name: 'Plantillas',
    component: PlantillasVue
  },
  {
    path: '/Routing',
    name: 'Routing',
    component: RoutingVue
  },
  {
    path: '/Watchers',
    name: 'Watchers',
    component: WatchersVue
  },
  {
    path: '/Animation',
    name: 'Animation',
    component: AnimationVue
  },
  {
    path: '/Build',
    name: 'Build',
    component: BuildVue
  },
  {
    path: '/Deployment',
    name: 'Deployment',
    component: DeploymentVue
  }
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

