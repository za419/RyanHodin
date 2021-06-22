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
    <div class="left">
      <a v-bind:href="discordURL"><q-icon name="fab fa-discord" />za419#0014</a>
    </div>
    <div class="right">
      <a v-bind:href="githubURL"><q-icon name="fab fa-github" />za419</a>
    </div>
    <div class="left">
      <a v-bind:href="facebookURL"
        ><q-icon name="fab fa-facebook" />Ryan Hodin</a
      >
    </div>
    <div class="right">
      <a v-bind:href="linkedinURL"
        ><q-icon name="fab fa-linkedin" />Ryan Hodin</a
      >
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
      discordURL: "https://discord.com/users/195682839998627840",
      githubURL: "https://github.com/za419",
      facebookURL: "/",
      linkedinURL: "https://www.linkedin.com/in/ryan-hodin-902191116/",
    };
  },
};
</script>

<style lang="scss">
.host {
  width: 500px;
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
