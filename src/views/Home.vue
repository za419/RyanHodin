<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  pageTitle = "Ryan Hodin";
  pageDescription = "The personal website of a programmer named Ryan Hodin";
}
</script>
