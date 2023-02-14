<template>
  <div class="contact-section-root">
    <h6 class="header">Contact&nbsp;Me</h6>
    <div class="contact-info">
      <div class="left">
        <a v-bind:href="'mailto:' + email" target="_blank"
          ><q-icon name="mail" /><span class="underline">{{ email }}</span></a
        >
      </div>
      <div class="right">
        <a v-bind:href="githubURL" target="_blank"
          ><q-icon name="fab fa-github" /><span class="underline"
            >za419</span
          ></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactSection",
  data: (): Record<string, unknown> => {
    return {
      email: "ryan951357@gmail.com",
      githubURL: "https://github.com/za419",
    };
  },
};
</script>

<style lang="scss">
.contact-section-root {
  width: 80%;
  max-width: 1500px;
  margin: 7px auto;

  .header {
    width: 100%;
    margin: 0;
    text-align: center;
  }

  .contact-info {
    display: grid;
    gap: 0;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "left . right"
    align-items: center;
    place-content: space-around;

    .left {
      grid-area: left;
      justify-self: start;
    }

    .right {
      grid-area: right;
      justify-self: end;
    }
  }

  a {
    text-decoration: none;

    .q-icon {
      color: black;
      margin-right: 0.15ch;
    }
  }
}

// If someone asked us to save space and we're on a small screen, hide the header
@media screen and (orientation: portrait) and (max-width: 500px) {
  .space-saver-500px-wide .contact-section-root .header {
    display: none;
  }
}

@media screen and (orientation: landscape) and (max-height: 50em) {
  .space-saver-50em-tall .contact-section-root .header {
    display: none;
  }
}
</style>
