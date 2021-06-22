// This supports the conversion of blog files to renderable HTML.

import { BlogDescription } from "./app.types";

interface ConversionElement {
  start: string;
  end: string;
  open: string;
  close: string;
  processContents?: (contents: string) => string;
}

// Mapping of html special characters for use in escaping down the line
const htmlSpecialCharacters: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

function escapeStringForHTML(str: string): string {
  for (const key in htmlSpecialCharacters) {
    str = str.replace(key, htmlSpecialCharacters[key]);
  }
  return str;
}

const defaultConversions: ConversionElement[] = [
  {
    start: "/",
    end: "/",
    open: "<em>",
    close: "</em>",
  },
  {
    start: "*",
    end: "*",
    open: "<strong>",
    close: "</strong>",
  },
  {
    start: "-",
    end: "-",
    open: "<s>",
    close: "</s>",
  },
  {
    start: "_",
    end: "_",
    open: "<u>",
    close: "</u>",
  },
  {
    start: "^",
    end: "^",
    open: "<sup>",
    close: "</sup>",
  },
  {
    start: "#",
    end: "\n",
    open: '<h4 class="blog-text-title">',
    close: "</h4>",
  },
  {
    start: "##",
    end: "\n",
    open: '<h5 class="blog-text-subtitle">',
    close: "</h5>",
  },
  {
    start: "###",
    end: "\n",
    open: '<h6 class="blog-text-minor-title">',
    close: "</h6>",
  },
  {
    start: "--link ",
    end: " link--",
    open: "<a class='blog-text-link' ",
    close: "</a>",
    processContents: (properties) => {
      // Properties for a link has the following spec:
      // href "text" "title"
      // The quoted properties are allowed to include spaces, and any amount of whitespace may be between properties. Handle accordingly.

      // Start out by getting the href.
      const firstSpace = properties.indexOf(" ");
      if (firstSpace === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid link spec: " + properties);
        return ">";
      }
      let linkElement =
        "href='" +
        escapeStringForHTML(properties.substring(0, firstSpace)) +
        "' ";

      // Chop off that part and continue to the link text.
      properties = properties.substring(firstSpace + 1);

      // Chop off the part of properties leading up to the next quote
      // (we spec whitespace only, but don't verify that's the case.)
      let quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid link spec: " + properties);
        return ">";
      }
      properties = properties.substring(quoteIndex + 1);

      // Now find the next quote, and grab everything inbetween as our text (for later).
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid link spec: " + properties);
        return ">";
      }
      const linkText = escapeStringForHTML(properties.substring(0, quoteIndex));

      // Chop off that part and continue to the link title
      properties = properties.substring(quoteIndex + 1);

      // Chop off the part of properties leading up to the next quote
      // (we spec whitespace only, but don't verify that's the case.)
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid link spec: " + properties);
        return ">";
      }
      properties = properties.substring(quoteIndex + 1);

      // Now find the next quote, and add on our title.
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid link spec: " + properties);
        return ">";
      }
      linkElement +=
        "title='" +
        escapeStringForHTML(properties.substring(0, quoteIndex)) +
        "'>";

      // And finally, add on our text.
      linkElement += linkText;
      return linkElement;
    },
  },
  {
    start: "--image ",
    end: " image--",
    open: "<figure class='blog-text-image-container'><img class='blog-text-image' loading='lazy' ",
    close: "</figure>",
    processContents: (properties) => {
      // Properties for a link has the following spec:
      // src "title-and-caption" "alt-text"
      // The quoted property is allowed to include spaces, and any amount of whitespace may be between properties. Handle accordingly.

      // Start out by getting the image source.
      const firstSpace = properties.indexOf(" ");
      if (firstSpace === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid image spec: " + properties);
        return ">";
      }
      let image =
        "src='" +
        escapeStringForHTML(properties.substring(0, firstSpace)) +
        "' ";

      // Chop off that part and continue to the title/caption.
      properties = properties.substring(firstSpace + 1);

      // Chop off the part of properties leading up to the next quote
      // (we spec whitespace only, but don't verify that's the case.)
      let quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid image spec: " + properties);
        return ">";
      }
      properties = properties.substring(quoteIndex + 1);

      // Now find the next quote, and grab for later.
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid image spec: " + properties);
        return ">";
      }
      const title = escapeStringForHTML(properties.substring(0, quoteIndex));

      // Add the title to the image element
      image += "title='" + title + "' ";

      // Chop off that part and continue to the alt-text.
      properties = properties.substring(firstSpace + 1);

      // Chop off the part of properties leading up to the next quote
      // (we spec whitespace only, but don't verify that's the case.)
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid image spec: " + properties);
        return ">";
      }
      properties = properties.substring(quoteIndex + 1);

      // Now find the next quote, and add it to the image element.
      quoteIndex = properties.indexOf('"');
      if (quoteIndex === -1) {
        // Well, this sucks, we can't really do anything.
        // Log an error and fail gracefully.
        console.error("Blog post included invalid image spec: " + properties);
        return ">";
      }
      image +=
        "alt='" +
        escapeStringForHTML(properties.substring(0, quoteIndex)) +
        "'>";

      // Now add on the caption.
      image +=
        "<figcaption class='blog-text-image-caption>" + title + "</figcaption>";

      return image;
    },
  },
];

export default async function blogRenderer(
  description: BlogDescription
): Promise<string> {
  // Add "front matter"
  let result = "";
  result += "<h2 class='blog-entry-title'>" + description.title + "</h2>";
  result += "<h3 class='blog-entry-subtitle'>" + description.subtitle + "</h3>";

  // Now throw in the publication info
  result +=
    "<div class='blog-entry-author-date-row'><div class='blog-entry-author'>Written By: ";
  result += description.author;
  result += "</div><div class='blog-entry-date'>Written on: ";

  // The date in the listing could be in any format that Date can parse (for author's convenience)
  // For example, the test entry has its datestamp as formatted by Git showing the commit where I wrote it.
  // We should re-format it into a format the reader will like.
  result += new Date(description.published).toLocaleString();
  result += "</div></div><div class='blog-entry-body'>";

  // Download the described blog entry file
  let text: string;
  try {
    const response = await fetch("/assets/blog/" + description.id + ".blog");
    text = await response.text();
  } catch {
    result +=
      "<div class='error'>An error occurred while fetching information for this blog post (id " +
      description.id +
      ").</div>";
    return result;
  }

  // Now, we need to iterate through the string to parse it, using our above conversions.

  return result + "</div>";
}
