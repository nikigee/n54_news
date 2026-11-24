<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const featuredItems = computed(() => props.data.slice(0, 1))
</script>

<template>
  <div>
    <article v-for="item in featuredItems" :key="item.id" class="mb-4">
      <div class="mb-3" v-if="item.img_url">
        <router-link class="d-block" :to="'/article/' + item.id">
          <img class="img-fluid shadow" :src="item.img_url" :alt="item.title" decoding="async" />
        </router-link>
      </div>
      <div class="text-start">
        <div class="my-4">
          <div class="text-muted">{{ item.brand }}</div>
          <router-link class="link-light link-underline-opacity-0" :to="'/article/' + item.id">
            <h2 class="h2 fw-bold">{{ item.title }}</h2>
          </router-link>
        </div>
        <p class="my-4 text-muted">{{ item.description }}</p>
        <p class="my-0 text-muted">
          By
          <a href="#" class="link-primary">{{ item.author }}</a>
        </p>
      </div>
    </article>
  </div>
</template>
