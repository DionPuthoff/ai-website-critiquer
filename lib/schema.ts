import { z } from 'zod';

export const CritiqueSchema = z.object({
  score: z.number(),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  ux: z.array(z.string()),
  seo: z.array(z.string()),
  conversion: z.array(z.string()),
  trustSignals: z.array(z.string()),
  recommendedChanges: z.array(z.string()),
});

export type Critique = z.infer<typeof CritiqueSchema>;