<template>
  <div class="app-wrap">
    <div class="text-start hero-banner">
      <video class="hero-video" autoplay loop muted playsinline src="/cyberpunk_city.mp4"></video>
      <div class="overlay"></div>
      <div class="container py-5">
        <h1 class="col-lg-8 mb-3">
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

    <div class="container text-start pb-5 mt-3">
      <div class="row">
        <div class="col">
          <List v-if="newArticles.length > 0" :data="newArticles" heading="New and Trending" />
          <List :data="articles" heading="Recommended Stories" />
        </div>
        <div class="d-none d-lg-block col-lg-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue"; // Adjust the import path as needed
import articleData from "@/assets/article_data.json"; // Adjust the import path as needed

export default {
  name: "HomePage",
  components: {
    List,
  },
  data() {
    return {
      newArticles: articleData.new_articles,
      articles: articleData.articles,
    };
  },
};
</script>