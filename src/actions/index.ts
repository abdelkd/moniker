import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { generateBrandNames } from "@/server";

type AIResponse = {
  brandNames: string[]
}

export const server = {
  generateNames: defineAction({
    input: z.object({
      description: z.string().min(10),
    }),
    handler: async ({ description }) => {
      try {
        const aiResponse = await generateBrandNames(description)
        const jsonResponse = JSON.parse(aiResponse.replaceAll(/(\`\`\`|json)/gi, "")) as AIResponse;
        console.log({ jsonResponse })

        return {
          error: false,
          message: "",
          data: jsonResponse,
        }
      } catch (err) {
        console.error(err)
        
        return {
          error: true,
          message: "Failed to generate brand name.",
          data: []
        }
      }
    },
  }),
}