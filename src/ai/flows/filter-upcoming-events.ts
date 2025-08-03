'use server';

/**
 * @fileOverview A flow to filter upcoming college events and activities based on a student's profile.
 *
 * - filterUpcomingEvents - A function that filters upcoming events for a student.
 * - FilterUpcomingEventsInput - The input type for the filterUpcomingEvents function.
 * - FilterUpcomingEventsOutput - The return type for the filterUpcomingEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterUpcomingEventsInputSchema = z.object({
  studentProfile: z.object({
    scholarId: z.string().describe('The scholar ID of the student.'),
    branch: z.string().describe('The branch of the student.'),
    interests: z.string().describe('The interests of the student.'),
  }).describe('The profile of the student.'),
  upcomingEvents: z.array(z.string()).describe('A list of upcoming events and activities in the college.'),
});
export type FilterUpcomingEventsInput = z.infer<typeof FilterUpcomingEventsInputSchema>;

const FilterUpcomingEventsOutputSchema = z.object({
  filteredEvents: z.array(z.string()).describe('A list of upcoming events and activities filtered based on the student profile.'),
});
export type FilterUpcomingEventsOutput = z.infer<typeof FilterUpcomingEventsOutputSchema>;

export async function filterUpcomingEvents(input: FilterUpcomingEventsInput): Promise<FilterUpcomingEventsOutput> {
  return filterUpcomingEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterUpcomingEventsPrompt',
  input: {
    schema: FilterUpcomingEventsInputSchema,
  },
  output: {
    schema: FilterUpcomingEventsOutputSchema,
  },
  prompt: `You are an AI assistant helping students filter upcoming college events based on their profile.

  Given the following student profile:
  Scholar ID: {{{studentProfile.scholarId}}}
  Branch: {{{studentProfile.branch}}}
  Interests: {{{studentProfile.interests}}}

  And the following list of upcoming events:
  {{#each upcomingEvents}}- {{{this}}}\n{{/each}}

  Filter the events that are most relevant to the student based on their branch and interests.
  Return only the events that would be of interest to the student.
  Do not include any events that are not relevant to the student's branch or interests.
  `, 
});

const filterUpcomingEventsFlow = ai.defineFlow(
  {
    name: 'filterUpcomingEventsFlow',
    inputSchema: FilterUpcomingEventsInputSchema,
    outputSchema: FilterUpcomingEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
