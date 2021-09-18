<template>
  <div class="contact-section-root">
    <h6 class="header">Contact Me</h6>
    <div class="left first-row">
      <a v-bind:href="'tel:' + phoneNumber"
        ><q-icon name="phone" /><span class="underline">{{
          phoneNumber
        }}</span></a
      >
    </div>
    <div class="right first-row">
      <a v-bind:href="'mailto:' + email"
        ><q-icon name="mail" /><span class="underline">{{ email }}</span></a
      >
    </div>
    <div class="left second-row">
      <a v-bind:href="discordURL"
        ><q-icon name="fab fa-discord" /><span class="underline"
          >za419#0014</span
        ></a
      >
    </div>
    <div class="right second-row">
      <a v-bind:href="githubURL"
        ><q-icon name="fab fa-github" /><span class="underline">za419</span></a
      >
    </div>
    <div class="left third-row">
      <a v-bind:href="facebookURL"
        ><q-icon name="fab fa-facebook" /><span class="underline"
          >Ryan Hodin</span
        ></a
      >
    </div>
    <div class="right third-row">
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
  width: 80%;
  max-width: 1500px;
  margin: 7px auto;
  display: grid;
  gap: 0;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    ". header ."
    "left . right"
    "left . right"
    "left . right";
  align-items: center;
  place-content: space-around;

  .header {
    grid-area: header;
    justify-self: center;
    grid-row: 1;
    margin: 0;
  }

  .left {
    grid-area: left;
    justify-self: start;
  }

  .right {
    grid-area: right;
    justify-self: end;
  }

  .first-row {
    grid-row: 2;
  }

  .second-row {
    grid-row: 3;
  }

  .third-row {
    grid-row: 4;
  }

  a {
    text-decoration: none;

    .q-icon {
      color: black;
    }
  }
}
</style>
