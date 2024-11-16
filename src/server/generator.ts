import { model } from "./model"


const PROMPT = `
As a Brand Name Generator, Your job is to transform an idea description into a professional
and creative brand name. You will be provided an idea description, and you have to reply 
with brand name based on idea description.
Description:
`

const RULES = `
YOU MUST FOLLOW THESE RULES:
- THE BRAND NAME MUST BE CREATIVE
- THE BRAND NAME MUST FOLLOW THE DESCRIPTION
- IF A CRITERIA IS MENTIONED IN THE DESCRIPTION FOLLOW IT TOO
- YOU MUST REPLY IN JSON, A FIELD CALLED "brandNames" THE HAS AN ARRAY OF THE BRAND NAMES
- LIMIT THE OUTPUT TO ONLY 5 BRAND NAMES
`

export const generateBrandNames = async (description: string) => {
  const generated = await model.generateContent([
    PROMPT,
    description,
    RULES,
  ])

  return generated.response.text()
}
