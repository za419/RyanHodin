/* eslint-disable */
const fs = require("fs");
const listing = require("./public/assets/blog/listing.json");

// Copy file for public build
fs.copyFileSync("src/sitemap.txt", "public/sitemap.txt");

// Generate array of paths to add to the sitemap
const prefix = "https://za419.github.io/#/blog/";
const paths = listing.map((item) => prefix + item.id);

// And append it, newline-separated, to the file
fs.appendFileSync("public/sitemap.txt", paths.join("\n"));
