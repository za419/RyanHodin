// General types for the application.

// The type used to describe a single Blog entry
// (assets/blog/listing.json has type BlogDescription[])
export interface BlogDescription {
  id: number;
  title: string;
  subtitle: string;
}
