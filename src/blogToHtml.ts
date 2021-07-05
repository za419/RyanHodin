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
    start: "_____",
    end: "\n",
    open: "<hr>",
    close: "",
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
  // TODO: I'm convinced that there's a better way to implement this loop than this one.
  // Fundamentally, on each iteration we need to start by finding the index of the first occurrence of any
  // recognition string in the dictionary, and then figure out what pattern it should match.
  // The rule should be to match the longest pattern first...
  // I can think of three ways this should be doable.
  // 1. (Naive) Search linearly over the strings, at each character checking against each pattern.
  // 2. (Regex) Programmatically assemble a regular expression that will match any of the patterns,
  //    then check which one actually best matches the result we're given
  // 3. (indexOf mapping) Find the first index of each pattern, filter down to the ones that tie for earliest match,
  //    then choose one from these.
  // I've chosen to use option 3. I want either 2 or 3 because they make best use of the browser's ability to use native code,
  // and I prefer 3 for ending up using a less powerful tool (regex is more than we need for 'where does this first show up?')
  // Most of the iteration happens over shortening lists of translations anyway - Not the much longer (in practice) text.
  while (text.length) {
    // First, find the indices for all conversions.
    const translationIndices = defaultConversions.map((conversion) => {
      const index = text.indexOf(conversion.start);
      return {
        // Make sure the 'not found' index is the largest, not the smallest
        index: index === -1 ? text.length + 1 : index,
        conversion,
      };
    });

    // Now, find the index of the first conversion we run into...
    const firstIndex = Math.min(
      ...translationIndices.map((result) => result.index)
    );

    // Check that this actually occurs in the text.
    // If it doesn't, then we've done all the conversions, and we can handle that immediately.
    if (firstIndex > text.length) {
      result += text;
      break;
    }

    // And find the winning conversion.
    // It is in fact perfectly legal to have a tie - This is perhaps non-obvious, but in the case of for example --image,
    // the first match will be a tie between - and --image.
    // We need to make sure we pick the correct one - The longest of all the matches that appear at the earliest index.
    const translation = translationIndices.reduce((previous, current) => {
      // If this is not the first match, don't even bother looking at it.
      if (current.index > firstIndex) {
        return previous;
      }

      // If this is a first match, then return the option with the longer length
      // If there is a length tie, return the current option - The last specified element wins.
      if (
        previous == null ||
        current.conversion.start.length >= previous.conversion.start.length
      ) {
        return current;
      }

      // If previous is non-null and previous is longer than current, keep previous.
      return previous;
    }, null as { index: number; conversion: ConversionElement } | null) as {
      index: number;
      conversion: ConversionElement;
    };

    // Notice the assertion above that the result will never be null - This is true whenever we have at least one translation at minimum index, which we have to.
    // So now we have a translation, and we can expand it into HTML.
    // First, we need to not lose the text before the first translation tag.
    result += text.substring(0, translation.index);

    // Now, we look at the translation itself. We need to find the translation's end tag.
    // This is rather easy - We know what string we're looking for, and we don't care if other start or end tags appear in between.
    const end = text.indexOf(translation.conversion.end, translation.index + 1);

    // If the translation never ends, then we should treat it as plantext and continue.
    if (end === -1) {
      result += translation.conversion.start;
      text = text.substring(
        translation.index + translation.conversion.start.length
      );
      continue;
    }

    // Assuming it doesn't, we can separate the translation text and the continuation text.
    const translationText = text.substring(
      translation.index + translation.conversion.start.length,
      end
    );
    text = text.substring(end + translation.conversion.end.length);

    // And now all we have to do is figure out what to add to result.
    // Start with the translation start tag.
    result += translation.conversion.open;

    // If the translation has a custom translator, call it and add it onto result.
    if (translation.conversion.processContents) {
      result += translation.conversion.processContents(translationText);
    } else {
      // Otherwise, just use the plaintext.
      result += translationText;
    }

    // And finally, add on the closing tag.
    result += translation.conversion.close;
  }

  // Remember to close the blog-entry-body div when we return the contents.
  return result + "</div>";
}
