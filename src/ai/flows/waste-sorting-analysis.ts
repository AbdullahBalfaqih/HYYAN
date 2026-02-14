'use server';

/**
 * @fileOverview A waste sorting analysis AI agent.
 *
 * - wasteSortingAnalysis - A function that handles the waste sorting analysis process.
 * - WasteSortingAnalysisInput - The input type for the wasteSortingAnalysis function.
 * - WasteSortingAnalysisOutput - The return type for the wasteSortingAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WasteSortingAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of home waste sorting, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type WasteSortingAnalysisInput = z.infer<typeof WasteSortingAnalysisInputSchema>;

const WasteSortingAnalysisOutputSchema = z.object({
  analysisResult: z.string().describe('The analysis result of the waste sorting in the photo.'),
  followsRecommendations: z.boolean().describe('Whether the waste sorting follows recommendations.'),
});
export type WasteSortingAnalysisOutput = z.infer<typeof WasteSortingAnalysisOutputSchema>;

export async function wasteSortingAnalysis(input: WasteSortingAnalysisInput): Promise<WasteSortingAnalysisOutput> {
  return wasteSortingAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wasteSortingAnalysisPrompt',
  input: {schema: WasteSortingAnalysisInputSchema},
  output: {schema: WasteSortingAnalysisOutputSchema},
  prompt: `You are an expert in waste sorting and recycling.

You will analyze the photo of the home waste sorting and provide feedback on whether the sorting follows recommendations.

Analyze the following photo:
{{media url=photoDataUri}}

Respond in the following format:
{
  "analysisResult": "Detailed analysis of the waste sorting.",
  "followsRecommendations": true/false
}
`,
});

const wasteSortingAnalysisFlow = ai.defineFlow(
  {
    name: 'wasteSortingAnalysisFlow',
    inputSchema: WasteSortingAnalysisInputSchema,
    outputSchema: WasteSortingAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
