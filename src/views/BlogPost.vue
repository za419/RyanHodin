<template>
  <FullBlogItem :id="parseInt($route.params.id)" navigationRoot="/blog/" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BlogPost extends Vue {}
</script>
