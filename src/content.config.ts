import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog=defineCollection({
    loader: glob({base:"./src/content/blog",pattern:"**/*.{md,mdx}"}),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        created:z.date(),
        updated:z.date().optional(),
        tag:z.array(z.string()).optional()
    })
})

export const collections={ blog };