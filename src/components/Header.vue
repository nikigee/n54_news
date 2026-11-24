<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '@/assets/n54logo.png'

const navItems = [
  'Gossip',
  'Opinion',
  'Weather',
  'Tech',
  'Lifestyle',
  'Entertainment',
  'Business',
  'World',
]

const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <div class="container">
    <header class="site-header py-3 py-lg-4">
      <div class="d-flex align-items-center justify-content-between">
        <router-link to="/" class="d-flex align-items-center link-light text-decoration-none">
          <img :src="logo" width="32" height="37" class="me-2" alt="Network 54 Logo" />
          <span class="fs-4 fw-bold text-uppercase lato-bold nav-logo">Network 54</span>
        </router-link>

        <button
          type="button"
          class="menu-toggle d-lg-none"
          :aria-expanded="menuOpen"
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
            />
          </svg>
        </button>

        <nav class="d-none d-lg-block" aria-label="Primary sections">
          <ul class="nav nav-pills text-uppercase">
            <li v-for="item in navItems" :key="item" class="nav-item">
              <a href="#" class="nav-link">{{ item }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <nav
        v-show="menuOpen"
        id="primary-navigation"
        class="mobile-nav d-lg-none mt-3 pt-3"
        aria-label="Primary sections"
      >
        <ul class="mobile-nav-grid list-unstyled mb-0 text-uppercase">
          <li v-for="item in navItems" :key="item">
            <a href="#" class="mobile-nav-link" @click="menuOpen = false">{{ item }}</a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.nav-logo {
  letter-spacing: 1px;
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #142218;
  border-radius: 4px;
  background-color: #061009;
  color: #00c853;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover,
  &:focus-visible {
    border-color: #00c853;
    background-color: rgba(0, 200, 83, 0.1);
  }
}

.mobile-nav {
  border-top: 1px solid #142218;
}

.mobile-nav-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

.mobile-nav-link {
  display: block;
  padding: 0.55rem 0.75rem;
  border: 1px solid #142218;
  border-radius: 4px;
  background-color: #050d07;
  color: #00c853;
  text-decoration: none;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(0, 200, 83, 0.55);
    background-color: rgba(0, 200, 83, 0.1);
    color: #2ee66b;
  }
}
</style>
