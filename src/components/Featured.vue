<template>
    <div>
        <div v-for="item in reversedData" :key="item.id">
            <div class="mb-4">
                <div class="mb-3">
                    <img class="img-fluid shadow" :src="getURL(item.img_url)" alt="Article Image" />
                </div>
                <div class="text-start">
                    <div class="">
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
                </div>
            </div>
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
        data: {
            type: Array,
            required: true,
        },
    },
    computed: {
        reversedData() {
            return [...this.data].slice(0, 1);
        },
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>