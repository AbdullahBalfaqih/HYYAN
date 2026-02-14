'use server';

/**
 * @fileOverview Assesses a user's efforts to reduce plastic use based on their description.
 *
 * - plasticUseAssessment - A function that assesses the user's description and returns an assessment.
 * - PlasticUseAssessmentInput - The input type for the plasticUseAssessment function.
 * - PlasticUseAssessmentOutput - The return type for the plasticUseAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlasticUseAssessmentInputSchema = z.object({
  description: z.string().describe('A description of the user\'s efforts to reduce plastic use.'),
});
export type PlasticUseAssessmentInput = z.infer<typeof PlasticUseAssessmentInputSchema>;

const PlasticUseAssessmentOutputSchema = z.object({
  assessment: z.string().describe('An assessment of the user\'s progress towards plastic reduction goals.'),
  score: z.number().describe('A numerical score indicating the effectiveness of the user\'s plastic reduction efforts.'),
});
export type PlasticUseAssessmentOutput = z.infer<typeof PlasticUseAssessmentOutputSchema>;

export async function plasticUseAssessment(input: PlasticUseAssessmentInput): Promise<PlasticUseAssessmentOutput> {
  return plasticUseAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plasticUseAssessmentPrompt',
  input: {schema: PlasticUseAssessmentInputSchema},
  output: {schema: PlasticUseAssessmentOutputSchema},
  prompt: `You are an AI assistant designed to assess a user's efforts to reduce plastic use.

  Based on the following description, provide an assessment of the user's progress towards plastic reduction goals and a numerical score between 0 and 100.

  Description: {{{description}}}

  Consider factors such as the variety of efforts, the level of commitment, and the potential impact on plastic reduction.
  The assessment should be encouraging and provide specific feedback to motivate the user.
  The score should reflect the effectiveness of the user's efforts, with 100 indicating a perfect score.
  Be concise and focus on providing actionable insights.
  Remember to incorporate the schema descriptions to ensure the output is correct. Output MUST be valid JSON.`, 
});

const plasticUseAssessmentFlow = ai.defineFlow(
  {
    name: 'plasticUseAssessmentFlow',
    inputSchema: PlasticUseAssessmentInputSchema,
    outputSchema: PlasticUseAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
