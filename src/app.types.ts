// General types for the application.

// The type used to describe a single Blog entry
// (assets/blog/listing.json has type BlogDescription[])
export interface BlogDescription {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  published: string; // In any format parsable by JS Date (we'll reformat it for display)
}

// The type returned by all blog parsing functions
export interface BlogParts {
  header: string;
  body: string;
}
