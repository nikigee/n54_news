<script setup>
import { onMounted, ref } from 'vue'
import List from '@/components/List.vue'
import Featured from '@/components/Featured.vue'
import SideList from '@/components/SideList.vue'
import Adverts from '@/components/Adverts.vue'
import StockTicker from '@/components/StockTicker.vue'
import { useArticles } from '@/composables/useArticles'

const { newArticles, articles, adverts, featured } = useArticles()
const heroVideo = ref(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && heroVideo.value) {
    heroVideo.value.pause()
  }
})
</script>

<template>
  <div class="app-wrap">
    <div class="text-start hero-banner">
      <video
        ref="heroVideo"
        class="hero-video"
        autoplay
        loop
        muted
        playsinline
        poster="/cyberpunk_city_poster.webp"
        src="/cyberpunk_city.mp4"
        aria-hidden="true"
      ></video>
      <div class="overlay"></div>
      <div class="container py-5">
        <h1 class="col-lg-8 mb-3 text-uppercase">
          Welcome to Network 54.
        </h1>
        <p class="lead col-lg-8">
          We've been Earth's leading information stream for the last three
          decades. You care to be informed. We've meticulously tailored this
          selection of screamsheets to match your past interests and activities,
          all for your convenience. This is Network News 54.
        </p>
        <p class="lead col-lg-8">
          Follow us on Verge at <code>@N54News</code> for the latest updates.
        </p>
      </div>
    </div>

    <StockTicker />

    <div class="container text-start pb-5 pt-5">
      <div class="row">
        <div class="col-lg-8">
          <Featured :data="featured" />
          <List v-if="articles.length > 0" :data="articles" heading="Recommended Stories" />
        </div>
        <div class="col-lg">
          <SideList v-if="newArticles.length > 0" :data="newArticles" heading="Trending Stories" />
          <SideList v-if="adverts.length > 0" :data="adverts" heading="Sponsored" />
          <Adverts />
        </div>
      </div>
    </div>
  </div>
</template>
