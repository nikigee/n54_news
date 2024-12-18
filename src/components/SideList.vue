<template>
    <div>
        <h2 class="mb-4 fw-bold h4">{{ heading }}</h2>
        <div v-for="item in reversedData" :key="item.id" class="py-2">
            <div class="row justify-content-md-start align-items-top mb-4">
                <div class="mb-3">
                    <img class="img-fluid" :src="getURL(item.img_url)" alt="Article Image" />
                </div>
                <div class="text-start">
                    <div class="row">
                        <div class="text-muted">{{ item.brand }}</div>
                        <router-link class="link-light link-underline-opacity-0" :to="'/article/' + item.id">
                            <p class="h3 fw-bold">{{ item.title }}</p>
                        </router-link>
                        <p class="mb-2 text-muted">{{ item.description }}</p>
                        <p class="my-0 text-muted">
                            By
                            <a href="#" class="link-primary">{{ item.author }}</a>
                        </p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>

<script setup>

function getURL(url) {
    return url;
}

</script>

<script>
export default {
    props: {
        heading: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
    computed: {
        reversedData() {
            return [...this.data].reverse();
        },
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>