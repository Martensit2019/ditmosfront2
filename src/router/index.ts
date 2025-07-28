import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/questionnaires',
      name: 'questionnaires',
      component: () => import('@/views/QuestionnairesView.vue'),
    },
    {
      path: '/questionnaires/:id',
      name: 'questionnairesList',
      component: () => import('@/views/QuestionnairesListView.vue'),
    },
    {
      path: '/questionnaires/:id/:quizId',
      name: 'questionnaire',
      component: () => import('@/views/QuestionnaireView.vue'),
    },
    {
      path: '/questionnaires/:id/:quizId/result',
      name: 'questionnaireResult',
      component: () => import('@/views/QuestionnaireResultView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
