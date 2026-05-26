export const SITE_TITLE = "⊢logoi";
export const SITE_DESCRIPTION = "notes on logic, computation, language, and philosophy";
export const SITE_URL = "https://logoi.blog";
export const SITE_BASE = "/";
export const NOTES_PER_PAGE = 5;

export const normalizeBase = (base) => {
  if (!base || base === "/") return "";
  return base.startsWith("/") ? base.replace(/\/$/, "") : `/${base.replace(/\/$/, "")}`;
};

export const BASE_PATH = normalizeBase(SITE_BASE);

export const withBase = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) return normalizedPath;
  return `${BASE_PATH}${normalizedPath === "/" ? "" : normalizedPath}`;
};

export const siteTitle = (pageTitle) =>
  pageTitle ? `${SITE_TITLE} | ${pageTitle}` : SITE_TITLE;

export const ASSETS = {
  fonts: {
    regular: withBase("/fonts/new-computer-modern/NewCM10-Book.otf"),
    italic: withBase("/fonts/new-computer-modern/NewCM10-BookItalic.otf"),
    bold: withBase("/fonts/new-computer-modern/NewCM10-Bold.otf"),
    boldItalic: withBase("/fonts/new-computer-modern/NewCM10-BoldItalic.otf"),
  },
  siteIcon: withBase("/icons/turnstile.svg"),
  tagIcon: withBase("/icons/tag.svg"),
};
