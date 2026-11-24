<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '@/composables/useArticles'

const route = useRoute()
const { getArticleById } = useArticles()

const story = computed(() => getArticleById(route.params.articleId))

const articleMarkup = computed(() => {
  const html = story.value?.content || '<p>The contents of this article have been redacted.</p>'
  return html.replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"')
})

const readProgress = ref(0)

function updateReadProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollableHeight <= 0) {
    readProgress.value = 0
    return
  }
  readProgress.value = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
}

watch(
  () => route.params.articleId,
  () => {
    readProgress.value = 0
  },
)

onMounted(() => {
  updateReadProgress()
  window.addEventListener('scroll', updateReadProgress, { passive: true })
  window.addEventListener('resize', updateReadProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadProgress)
  window.removeEventListener('resize', updateReadProgress)
})
</script>

<template>
  <div v-if="story" class="reading-progress" aria-hidden="true">
    <div class="reading-progress-bar" :style="{ width: `${readProgress}%` }"></div>
  </div>

  <div class="container text-start" v-if="story">
    <div class="row justify-content-start mb-5">
      <div class="col">
        <div class="mb-2">
          <router-link to="/" class="link-primary d-inline-flex align-items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
            Back
          </router-link>
        </div>
        <img
          v-if="story.img_url"
          class="img-fluid mb-3 main-image"
          :src="story.img_url"
          :alt="story.title"
          decoding="async"
        />
        <div class="my-1">
          <span class="border px-2 py-1 d-inline-block text-muted border-muted" style="font-size: 0.8rem">
            {{ story.brand }}
          </span>
        </div>
        <h1 class="h2 fw-bold">{{ story.title }}</h1>
        <p class="text-secondary">{{ story.description }}</p>
        <p class="text-secondary">
          By
          <a href="#" class="link-primary">{{ story.author }}</a>
        </p>
        <div class="article-content" v-html="articleMarkup"></div>
      </div>
      <div class="col-5 d-none d-xl-block"></div>
    </div>
  </div>
  <div class="container text-center" v-else>
    Sorry, that article does not exist on our records.
  </div>
</template>

<style lang="scss" scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(20, 34, 24, 0.7);
  z-index: 1050;
  pointer-events: none;
}

.reading-progress-bar {
  height: 100%;
  background-color: #00c853;
  box-shadow: 0 0 10px rgba(0, 200, 83, 0.75);
  transition: width 0.08s linear;
}

.main-image {
  max-height: 800px;
}

@media (prefers-reduced-motion: reduce) {
  .reading-progress-bar {
    transition: none;
  }
}
</style>
