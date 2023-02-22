import { defineConfig } from "astro/config";
import NetlifyCMS from "astro-netlify-cms";
import { v4 as uuidv4 } from "uuid";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://astroblog-netlifycms.netlify.app",
  integrations: [
    NetlifyCMS({
      adminPath: "/blog/admin",
      config: {
        // Use Netlify’s “Git Gateway” authentication and target our default branch
        backend: {
          name: "git-gateway",
          branch: "latest",
        },
        // Configure where our media assets are stored & served from
        media_folder: "public/assets/blog",
        public_folder: "/assets/blog",
        // Configure the content collections
        collections: [
          {
            name: "blog",
            label: "Blog Posts",
            label_singular: "Blog Post",
            folder: "src/pages/posts",
            create: true,
            delete: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
              {
                label: "Title",
                name: "title",
                widget: "string",
              },
              {
                label: "Description",
                name: "description",
                widget: "string",
              },
              {
                label: "Hero Image",
                name: "heroImage",
                widget: "image",
              },
              {
                name: "author",
                widget: "string",
                label: "Author Name",
                required: false,
              },
              {
                name: "authorURL",
                widget: "string",
                label: "Author URL",
                required: false,
              },
              {
                name: "publishDate",
                widget: "datetime",
                format: "DD MMM YYYY hh:mm",
                date_format: "DD MMM YYYY hh:mm",
                time_format: false,
              },
              {
                label: "Body",
                name: "body",
                widget: "markdown",
              },
              { 
                name: "uniqueId",
                widget: "hidden",
                default: uuidv4(),
              },
              {
                name: "layout",
                widget: "hidden",
                default: "../../layouts/BlogPostLayout.astro",
              },
            ],
          },
        ],
      },
      previewStyles: ["/src/styles/blog.css"],
    }),
    tailwind(),
    sitemap({
      filter: (page) =>
        page !== "https://astroblog-netlifycms.netlify.app/blog/admin/",
    }),
  ],
});
