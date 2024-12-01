import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

interface Release {
  name: string;
  date: string;
  notes: string;
}

interface ReleaseData {
  releases: Release[];
}

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch('https://github.com/cheeriojs/cheerio/releases');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const releases: Release[] = $('section').map((_, element) => {
      const name = $(element).find('h2').text().trim() || 'Unknown';
      const date = $(element).find('relative-time').attr('datetime') || 'Unknown';
      const notes = $(element).find('.markdown-body').html()?.trim() || 'No notes available';

      return { name, date, notes };
    }).get();

    const data: ReleaseData = { releases };

    return json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching releases:', error);
    return json({ message: 'Internal Error' }, { status: 500 });
  }
};