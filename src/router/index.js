import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import { useArticles } from '@/composables/useArticles'

const DEFAULT_TITLE = "Network 54 - The System's Leading News Corporation"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: ArticleView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'article') {
    const { getArticleById } = useArticles()
    const story = getArticleById(to.params.articleId)
    document.title = story ? `${story.title} | Network 54` : DEFAULT_TITLE
    return
  }
  document.title = DEFAULT_TITLE
})

export default router
