<template>
    <div class="container text-start" v-if="story">
        <div class="row justify-content-start mb-5">
            <div class="col">
                <div class="mb-2"><router-link to="../" class="link-primary"><i class="bi bi-arrow-left"></i>
                        Back</router-link></div>
                <img class="img-fluid mb-3" :src="getURL(story.img_url)" alt="Article Image" />
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
                <div class="article-content" v-html="createMarkup(story.content)"></div>
            </div>
            <div class="col-5 d-none d-xl-block"></div>
        </div>
    </div>
    <div class="container text-center" v-else>
        Sorry, that article does not exist on our records.
    </div>
</template>

<script setup>

function getURL(url) {
    return url;
}

</script>

<script>
import { useRoute } from "vue-router";
import articleData from "@/assets/article_data.json"; // Adjust path as needed

export default {
    name: "Article",
    data() {
        return {
            story: null,
        };
    },
    computed: {
        articles() {
            return articleData.articles;
        },
    },
    methods: {
        createMarkup(input) {
            if (input) return input;
            else return "<p>The contents of this article have been redacted.</p>";
        },
    },
    mounted() {
        const route = useRoute();
        const articleId = route.params.articleId;
        this.story = this.articles.find((v) => v.id === articleId);
    },
};
</script>

<style scoped>
/* Add any styles specific to this component */
</style>