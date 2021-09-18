<template>
  <div class="privacy-policy-root">
    <h2 class="title">Privacy Policy</h2>
    <div class="publish-date">Last updated: {{ lastUpdated }}</div>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, string> {
    return {
      pageTitle: "Privacy Policy - Ryan Hodin",
      pageDescription:
        "An in-depth description of all the personal information I don't collect.",
    };
  },
});
</script>

<style lang="scss">
.privacy-policy-root {
  width: 75%;
  max-width: 1250px;
  margin: auto;

  p {
    margin-top: 1em;
  }

  h2.title,
  div.publish-date {
    margin: 1em 0;
  }
}

@media screen and (orientation: portrait) {
  .privacy-policy-root {
    width: 85%;
  }
}

@media screen and (min-width: 1250px) {
  .privacy-policy-root {
    font-size: 1.2em;
  }
}
</style>
