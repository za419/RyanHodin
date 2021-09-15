<template>
  <div class="contact-section-root">
    <div class="left">
      <a v-bind:href="'tel:' + phoneNumber"
        ><q-icon name="phone" /><span class="underline">{{
          phoneNumber
        }}</span></a
      >
    </div>
    <div class="right">
      <a v-bind:href="'mailto:' + email"
        ><q-icon name="mail" /><span class="underline">{{ email }}</span></a
      >
    </div>
    <div class="left">
      <a v-bind:href="discordURL"
        ><q-icon name="fab fa-discord" /><span class="underline"
          >za419#0014</span
        ></a
      >
    </div>
    <div class="right">
      <a v-bind:href="githubURL"
        ><q-icon name="fab fa-github" /><span class="underline">za419</span></a
      >
    </div>
    <div class="left">
      <a v-bind:href="facebookURL"
        ><q-icon name="fab fa-facebook" /><span class="underline"
          >Ryan Hodin</span
        ></a
      >
    </div>
    <div class="right">
      <a v-bind:href="linkedinURL"
        ><q-icon name="fab fa-linkedin" /><span class="underline"
          >Ryan Hodin</span
        ></a
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
.contact-section-root {
  width: 500px;
  margin: 7px 5%;

  a {
    text-decoration: none;

    .underline {
      text-decoration: underline;
    }

    .q-icon {
      color: black;
    }
  }
}
</style>
