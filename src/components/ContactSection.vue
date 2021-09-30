<template>
  <div class="contact-section-root">
    <h6 class="header">Contact&nbsp;Me</h6>
    <div class="contact-info">
      <div class="left first-row">
        <a v-bind:href="'tel:' + phoneNumber" target="_blank"
          ><q-icon name="phone" /><span class="underline">{{
            phoneNumber
          }}</span></a
        >
      </div>
      <div class="right first-row">
        <a v-bind:href="'mailto:' + email" target="_blank"
          ><q-icon name="mail" /><span class="underline">{{ email }}</span></a
        >
      </div>
      <div class="left second-row">
        <a v-bind:href="discordURL" target="_blank"
          ><q-icon name="fab fa-discord" /><span class="underline"
            >za419#0014</span
          ></a
        >
      </div>
      <div class="right second-row">
        <a v-bind:href="githubURL" target="_blank"
          ><q-icon name="fab fa-github" /><span class="underline"
            >za419</span
          ></a
        >
      </div>
      <div class="left third-row">
        <a v-bind:href="facebookURL" target="_blank"
          ><q-icon name="fab fa-facebook" /><span class="underline"
            >Ryan Hodin</span
          ></a
        >
      </div>
      <div class="right third-row">
        <a v-bind:href="linkedinURL" target="_blank"
          ><q-icon name="fab fa-linkedin" /><span class="underline"
            >Ryan Hodin</span
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
      phoneNumber: "(775)622-7959",
      email: "ryan951357@gmail.com",
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
      "left . right"
      "left . right";
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

    .first-row {
      grid-row: 1;
    }

    .second-row {
      grid-row: 2;
    }

    .third-row {
      grid-row: 3;
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

// In landscape view, we have more space sideways than up-and-down, so flip ourselves to be wider than tall.
// Why did I not design it this way initially, you might ask?
// After all, most of this site is designed desktop, fullscreen-ish first, then it gets adjustments for mobile/portrait afterwards.
// (you can see this by looking at what I've put in @media queries as opposed to the "main" block of SCSS)
// The answer is, on a large desktop screen this whole component is so small that it doesn't matter.
// My flow for checking things is desktop -> mobile portrait -> mobile landscape -
// So I didn't notice I should do this until really late in development.
@media screen and (orientation: landscape) {
  .contact-section-root {
    .contact-info {
      grid-template-columns: unset;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "left left left"
        "right right right";

      .left {
        grid-row: 1;
      }

      .right {
        grid-row: 2;
      }

      .first-row {
        grid-column: 1;
      }

      .second-row {
        grid-column: 2;
        justify-self: start;
      }

      .third-row {
        grid-column: 3;
      }
    }
  }
}

// On very narrow screens, take up slightly more of the page width and slightly shrink the text to make sure we have enough room
@media screen and (max-width: 500px) {
  .contact-section-root {
    width: 90%;

    .header {
      font-size: 1.1rem;
      line-height: 1.15rem;
    }

    .contact-info {
      font-size: 0.9em;
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
