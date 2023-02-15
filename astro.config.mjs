import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [
    NetlifyCMS({
      config: {
        // Use Netlify’s “Git Gateway” authentication and target our default branch
        backend: {
          name: 'git-gateway',
          branch: 'latest',
        },
        // Configure where our media assets are stored & served from
        media_folder: 'public/assets/blog',
        public_folder: '/assets/blog',
        // Configure the content collections
        collections: [
          {
            name: "blog",
            label: "Blog Posts",
            label_singular: "Blog Post",
            folder: "src/pages/blog",
            create: true,
            delete: true,
            slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
            fields: [
              {
                label: "Layout",
                name: "layout",
                widget: "hidden",
                default: "blog",
              },
              { label: "Title", name: "title", widget: "string" },
              { label: "Description", name: "description", widget: "string" },
              { label: "Featured Image", name: "thumbnail", widget: "image" },
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
                format: "DD MMM YYYY",
                date_format: "DD MMM YYYY",
                time_format: false,
                label: "Publish Date",
              },
              { label: "Body", name: "body", widget: "markdown" },
              {
                name: "layout",
                widget: "select",
                default: "../../layouts/BlogPost.astro",
                options: [
                  { label: "Blog Post", value: "../../layouts/BlogPost.astro" },
                ],
              },
            ],
          },
        ],
      },
      previewStyles: ['/src/styles/blog.css'],
    }),
  ],
});
