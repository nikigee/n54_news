<script setup>
import { computed } from 'vue'

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})

const reversedData = computed(() => [...props.data].reverse())
</script>

<template>
  <div>
    <hr />
    <h2 class="my-4 fw-bold h4 section-heading">{{ heading }}</h2>
    <article v-for="item in reversedData" :key="item.id" class="py-2">
      <div class="row g-3 align-items-start mb-4">
        <div class="col-md-5" v-if="item.img_url">
          <router-link class="d-block" :to="'/article/' + item.id">
            <img
              class="img-fluid article-card-thumb"
              :src="item.img_url"
              :alt="item.title"
              loading="lazy"
              decoding="async"
            />
          </router-link>
        </div>
        <div class="col text-start">
          <div class="text-muted">{{ item.brand }}</div>
          <router-link class="link-light link-underline-opacity-0" :to="'/article/' + item.id">
            <p class="h3 fw-bold">{{ item.title }}</p>
          </router-link>
          <p class="mb-2">{{ item.description }}</p>
          <p class="my-0 text-muted">
            By
            <a href="#" class="link-primary">{{ item.author }}</a>
          </p>
        </div>
      </div>
      <hr />
    </article>
  </div>
</template>
