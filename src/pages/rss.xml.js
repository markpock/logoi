import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE, withBase } from "../site.config.mjs";

export async function GET(context) {
  const notes = (await getCollection("notes"))
    .filter((note) => !note.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description ?? "",
      pubDate: note.data.date,
      link: withBase(`/notes/${note.slug}/`),
    })),
  });
}
