<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-4">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
        <img :src="logo" width="32" height="37" class="me-2" alt="Network 54 Logo" />
        <span class="fs-4 fw-bold text-uppercase lato-bold nav-logo">Network 54</span>
      </a>

      <ul class="nav nav-pills justify-content-center text-uppercase">
        <li class="nav-item">
          <a href="#" class="nav-link">Gossip</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Opinion</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Weather</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Tech</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Lifestyle</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Entertainment</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Business</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">World</a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import logo from "@/assets/n54logo.png"; // Adjust the path if needed

export default {
  name: "Header",
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
.nav-logo{
  letter-spacing: 1px;
}
</style>