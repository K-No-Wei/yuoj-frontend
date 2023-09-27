<script setup lang="ts">
import BaseLayout from "@/layouts/BasicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <div class="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BaseLayout />
    </template>
  </div>
</template>

<style></style>
