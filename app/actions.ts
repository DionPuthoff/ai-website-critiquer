'use server';

import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { CritiqueSchema, type Critique } from '@/lib/schema';
import { extractPageContent } from '@/lib/extract-page-content';

type CritiqueResult =
  | { success: true; data: Critique }
  | { success: false; error: string };

function normalizeUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

export async function critiqueWebsite(url: string): Promise<CritiqueResult> {
  
  try {
    if (!url.trim()) {
      return { success: false, error: 'Please enter a URL.' };
    }

    const normalizedUrl = normalizeUrl(url);

    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 AI Website Critiquer',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch page: ${response.status}`,
      };
    }

    const html = await response.text();
    const pageContent = extractPageContent(html);

    const { object } = await generateObject({
      model: anthropic('claude-sonnet-4-6'),
      schema: CritiqueSchema,
      prompt: `
You are an expert website strategist reviewing a landing page.

Analyze the website content and return a concise, specific critique.

Focus on:
- clarity of the value proposition
- user experience
- SEO basics
- trust and credibility
- conversion opportunities

Rules:
- score must be a number from 1 to 10
- be specific
- avoid generic advice
- keep each item concise
- base your answer only on the content provided

Website URL:
${normalizedUrl}

Website content:
${pageContent}
`,
    });

    return { success: true, data: object };
  } catch (error) {
  console.error('critiqueWebsite error:', error);

  return {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : 'Something went wrong while analyzing the website.',
  };
}
}