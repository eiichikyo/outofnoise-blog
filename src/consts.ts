// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  blog,
};
