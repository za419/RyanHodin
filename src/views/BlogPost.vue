<template>
  <FullBlogItem :id="parseInt($route.params.id)" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BlogPost extends Vue {}
</script>
