<template><FullBlogInfo /></template>

<script lang="ts">
import FullBlogInfo from "@/components/FullBlogInfo.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { FullBlogInfo },
})
export default class BlogInfo extends Vue {}
</script>
