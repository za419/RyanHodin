<template>
  <div class="host">
    <div class="left">
      <a v-bind:href="'tel:' + phoneNumber"
        ><q-icon name="phone" />{{ phoneNumber }}</a
      >
    </div>
    <div class="right">
      <a v-bind:href="'mailto:' + email"><q-icon name="mail" />{{ email }}</a>
    </div>
    <br />
    <div class="left">
      <a v-bind:href="facebookURL"
        ><q-icon name="fab fa-facebook" />Ryan Hodin</a
      >
    </div>
    <div class="right">
      <a v-bind:href="githubURL"><q-icon name="fab fa-github" />za419</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactSection",
  data: (): Record<string, unknown> => {
    return {
      phoneNumber: "(012)345-6789",
      email: "address@example.com",
      facebookURL: "/",
      githubURL: "https://github.com/za419",
    };
  },
};
</script>

<style lang="scss">
.host {
  width: 600px;
  margin: 7px 5%;

  a .q-icon {
    color: black;
  }
}
.left {
  float: left;
}
.right {
  margin-left: 300px;
}
</style>
