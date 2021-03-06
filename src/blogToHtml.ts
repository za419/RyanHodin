// This supports the conversion of blog files to renderable HTML.

import { BlogDescription, BlogParts } from "./app.types";

interface ConversionElement {
  start: string;
  end: string;
  open: string;
  close: string;
  exampleContents: string | ((conversion: ConversionElement) => string) | null;
  description: string | null;
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
    str = str.replaceAll(key, htmlSpecialCharacters[key]);
  }
  return str;
}

const defaultConversions: ConversionElement[] = [
  {
    start: "/",
    end: "/",
    open: "<em>",
    close: "</em>",
    exampleContents: "emphasized",
    description:
      "Emphasizes the enclosed text (this is usually displayed as italics)",
  },
  {
    start: "*",
    end: "*",
    open: "<strong>",
    close: "</strong>",
    exampleContents: "strong text",
    description:
      "Strengthens the enclosed text (this is usually displayed as bold text)",
  },
  {
    start: "--",
    end: "--",
    open: "<s>",
    close: "</s>",
    exampleContents: "striked-through",
    description: "Strikes through the enclosed text",
  },
  {
    start: "_",
    end: "_",
    open: "<u>",
    close: "</u>",
    exampleContents: "underlined",
    description: "Underlines the enclosed text",
  },
  {
    start: "^",
    end: "^",
    open: "<sup>",
    close: "</sup>",
    exampleContents: "superscript",
    description: "Places the enclosed text in superscript",
  },
  {
    start: "_____",
    end: "\n",
    open: "<hr>",
    close: "",
    exampleContents: null,
    description: "Places a horizontal line across the page",
  },
  {
    start: "\n\n",
    end: "",
    open: "<p>",
    close: "",
    exampleContents: null,
    description: null,
  },
  {
    start: "\n",
    end: "",
    open: "<br>",
    close: "",
    exampleContents: null,
    description: null,
  },
  {
    start: "#",
    end: "\n",
    open: '<h4 class="blog-text-title">',
    close: "</h4>",
    exampleContents: "Title",
    description: "Makes the rest of the line a top-level header",
  },
  {
    start: "##",
    end: "\n",
    open: '<h5 class="blog-text-subtitle">',
    close: "</h5>",
    exampleContents: "Subtitle",
    description: "Makes the rest of the line a second-level header",
  },
  {
    start: "###",
    end: "\n",
    open: '<h6 class="blog-text-minor-title">',
    close: "</h6>",
    exampleContents: "Minor Title",
    description: "Makes the rest of the line a third-level header",
  },
  {
    start: "--link ",
    end: " link--",
    open: "<a class='blog-text-link' ",
    close: "</a>",
    exampleContents: () =>
      '&lt;target&gt; &quot;<a href="javascript:void(0)" title="<title>">&lt;text&gt;</a>&quot; &quot;&lt;title&gt;&quot;',
    description: `Creates a text link (Contents will be parsed to create a link).
    Usage: --link <target> "<text>" "<title>" link--
      <target> is the URL to link to
      <text> (note enclosure in quotes) is the text that will be linked
      <title> (note enclosure in quotes) will be used as "hover-over" text for the link`,
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
    exampleContents: () =>
      "&lt;source&gt; &quot;&lt;title&gt;&quot; &quot;&lt;error-text&gt;&quot;",
    description: `Insert an image into the page (Contents will be parsed to describe an image).
    Usage: --image <source> "<title>" "<alt-text>" image--
      <source> is the URL of the image you want to display
      <title> (note enclosure in quotes) will be displayed both as hover-over text and below the image
      <alt-text> (note enclosure in quotes) will be displayed if the image fails to load, or for text-to-speech readers`,
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
      properties = properties.substring(quoteIndex + 1);

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
        "<figcaption class='blog-text-image-caption'>" +
        title +
        "</figcaption>";

      return image;
    },
  },
  {
    start: "\n--list ",
    end: "\nlist--",
    open: "",
    close: "",
    exampleContents: "[un]ordered<br>Item 1<br>Item 2<br>",
    description: `Create a list of items from contents. Note that this must appear at the start of a line.
    Usage:
    --list <type>
    <items>
    list--

    <type> describes what style of list to use. This can be one of:
        "ordered" (items are numbered)
        "unordered" (items are noted with bullet points)
    <items> is the list of contents to be presented, one per line. For example:
        First item
        Second item
        Third item
      There is no minimum number of items for this list construct.`,
    processContents: (spec) => {
      // A list spec has the following structure:
      // --list <type>
      // <items>
      // list--
      // <type> must be either "ordered" or "unordered"
      // <items> should be a newline-separated collection of items for the list.

      // First, figure out the type.
      const firstNewline = spec.indexOf("\n");
      const typeString = spec.substring(0, firstNewline).trim();
      let isOrdered = null;
      if (typeString === "ordered") {
        isOrdered = true;
      } else if (typeString === "unordered") {
        isOrdered = false;
      } else {
        console.error("Unknown list type", typeString, "in link spec", spec);
        // Don't fail out of the translation - Let the null to default us to unordered.
      }

      // Now, turn the newline-separated list into a string of DOM list items
      const items = spec.substring(firstNewline + 1).split("\n");
      const contents = items
        .map((item) => `<li class='blog-text-list-item'>${item}</li>`)
        .join("");

      // And finally, assemble the result based on both above parts.
      let result;
      if (isOrdered) {
        result = `<ol class='blog-text-ordered-list'>${contents}</ol>`;
      } else {
        result = `<ul class='blog-text-unordered-list'>${contents}</ul>`;
      }
      return result;
    },
  },
];

// Renders the HTML for a blog item header
function blogHeaderRenderer(
  title: string,
  subtitle: string,
  author: string,
  published: string
): string {
  // Create "front matter"
  let header = "";
  header += "<h2 class='blog-entry-title'>" + title + "</h2>";
  header += "<h3 class='blog-entry-subtitle'>" + subtitle + "</h3>";

  // Now throw in the publication info
  header +=
    "<div class='blog-entry-author-date-row'><div class='blog-entry-author'><span class='blog-entry-author-text'>Written By: </span>";
  header += author;
  header +=
    "</div><div class='blog-entry-date'><span class='blog-entry-date-text'>Written on: </span>";

  // The date in the listing could be in any format that Date can parse (for author's convenience)
  // For example, the test entry has its datestamp as formatted by Git showing the commit where I wrote it.
  // We should re-format it into a format the reader will like.
  header += new Date(published).toLocaleString();
  header += "</div></div>";
  return header;
}

// Produces HTML describing in detail usage of the supported blog item translations
export function blogItemUsage(): string {
  const descriptions: string[] = [];
  for (const conversion of defaultConversions) {
    // Skip any entries that have null descriptions
    // (this is a signal that we're looking as a 'pseudoconversion', like for newlines)
    if (conversion.description == null) continue;

    // Start with a container
    let description = "<div class='blog-specification-usage'>";

    // First, add in the usage.
    // There are two types of tag - Those with empty ends (which replace the start string),
    // and those which enclose and modify some text.
    // We need to handle both.
    description += "<div class='blog-specification-usage-text'>";
    description += escapeStringForHTML(conversion.start);
    if (conversion.end != "" && conversion.end != "\n") {
      // Text-enclosed usage
      description += "&lt;contents&gt;";
      description += escapeStringForHTML(conversion.end);
    }
    description += "</div>";

    // Now, throw in the description specified in the description.
    description += "<pre class='blog-specification-usage-description'>";
    // Make newlines in the text render as newlines in HTML.
    description += escapeStringForHTML(conversion.description).replaceAll(
      "\n",
      "<br>"
    );
    description += "</pre>";

    // And finally close the container div and add it to the array.
    description += "</div>";
    descriptions.push(description);
  }
  return descriptions.join("");
}

// Produces HTML listing briefly giving an example of all blog item translations
export function blogItemUsageList(): string {
  const descriptions: string[] = [];
  for (const conversion of defaultConversions) {
    // Skip any entries that have null descriptions
    // (AKA 'pseudoconversions')
    if (conversion.description == null) continue;

    // Start with a container and starting text
    let description =
      "<li class='blog-specification-list-item'>" +
      escapeStringForHTML(conversion.start);

    // Then put in the example text.
    // There are three types of example text.
    //  - Null (just insert the start/end tags)
    //  - Constant string (insert the string into the description with styling tags from the conversion)
    //  - Function (call the function with the conversion, and insert the result as-is)
    if (conversion.exampleContents == null) {
      description += conversion.open;
      description += conversion.end;
    } else if (typeof conversion.exampleContents === "function") {
      description += conversion.exampleContents(conversion);
    } else {
      description += conversion.open;
      description += conversion.exampleContents;
      description += conversion.close;
    }

    // Now close the text, and container
    description += escapeStringForHTML(conversion.end);
    description += "</li>";

    // And push it into the list
    descriptions.push(description);
  }

  // Insert the list items into an unordered list, and return it.
  return (
    "<ul class='blog-specification-list'>" + descriptions.join("") + "</ul>"
  );
}

// Renders a blog item based on variables, rather than a file of contents
export function blogDataRenderer(
  title: string,
  subtitle: string,
  author: string,
  published: string,
  text: string
): BlogParts {
  // Get ourselves a header
  const header = blogHeaderRenderer(title, subtitle, author, published);

  // Now, get started on the body.
  // Start by opening the tag (naturally)
  let body = "<div class='blog-entry-body'>";

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
      body += text;
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
    body += text.substring(0, translation.index);

    // Now, we look at the translation itself. We need to find the translation's end tag.
    // This is rather easy - We know what string we're looking for, and we don't care if other start or end tags appear in between.
    const end = text.indexOf(
      translation.conversion.end,
      translation.index + translation.conversion.start.length
    );

    // If the translation never ends, then we should treat it as plantext and continue.
    if (end === -1) {
      body += translation.conversion.start;
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
    body += translation.conversion.open;

    // If the translation has a custom translator, call it and add it onto result.
    if (translation.conversion.processContents) {
      body += translation.conversion.processContents(translationText);
    } else {
      // Otherwise, just use the plaintext.
      body += translationText;
    }

    // And finally, add on the closing tag.
    body += translation.conversion.close;
  }

  // Remember to close the blog-entry-body div before we return the contents.
  body += "</div>";
  return { header, body };
}

// Blog items probably don't get updated while we're looking at the page.
// Therefore, this cache will store the renderered representation of blog items by their ID
// This will allow us to skip a network roundtrip (the parsing time isn't that long)
const blogByIdCache: Record<number, BlogParts> = {};

export default async function blogRenderer(
  description: BlogDescription
): Promise<BlogParts> {
  // First, check if we've already cached this item, so we don't do anything unnecessary.
  if (blogByIdCache[description.id]) {
    return blogByIdCache[description.id];
  }

  // Download the described blog entry file
  let text: string;
  try {
    const response = await fetch("/assets/blog/" + description.id + ".blog");
    text = await response.text();
  } catch {
    text =
      "<div class='error'>An error occurred while fetching information for this blog post (id " +
      description.id +
      ").</div>";
  }

  // And let the data-driven renderer do all the work
  const result = blogDataRenderer(
    description.title,
    description.subtitle,
    description.author,
    description.published,
    text
  );

  // Insert the result into the cache.
  blogByIdCache[description.id] = result;
  return result;
}

// Expose blog header rendering only through the interface of a BlogDescription
export function blogHeader(description: BlogDescription): string {
  return blogHeaderRenderer(
    description.title,
    description.subtitle,
    description.author,
    description.published
  );
}
