import * as cheerio from 'cheerio';

export function extractPageContent(html: string) {
  const $ = cheerio.load(html);

  $('script, style, noscript, svg, iframe').remove();

  const title = $('title').first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr('content')?.trim() || '';

  const h1s = $('h1')
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 3);

  const h2s = $('h2')
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 8);

  const paragraphs = $('p')
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 20);

  const links = $('a')
    .map((_, el) => $(el).text().replace(/\s+/g, ' ').trim())
    .get()
    .filter(Boolean)
    .slice(0, 20);

  return `
TITLE:
${title}

META DESCRIPTION:
${metaDescription}

H1:
${h1s.join('\n')}

H2:
${h2s.join('\n')}

PARAGRAPHS:
${paragraphs.join('\n')}

LINK TEXT:
${links.join('\n')}
  `.slice(0, 12000);
}