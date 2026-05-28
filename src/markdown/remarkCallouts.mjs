import { visit } from "unist-util-visit";

const calloutNames = new Set(["callout"]);
const explanationNames = new Set(["quote-explanation", "callout-explanation"]);

const addClass = (attributes, className) => {
  const current = attributes.class || "";
  attributes.class = [current, className].filter(Boolean).join(" ");
};

const isTruthyAttribute = (value) =>
  value === true || value === "" || value === "true" || value === "yes" || value === "left";

const sidebarWidthFor = (attributes) => {
  const width = attributes.sidebarWidth || attributes.sidebar || attributes.sidebarThickness;
  if (width === "none") return "none";
  if (width === "thin") return "2px";
  if (width === "medium") return "3px";
  if (width === "thick") return "7px";
  if (typeof width === "string" && /^\d+(\.\d+)?(px|rem|em)$/.test(width)) return width;
  if (typeof width === "number") return `${width}px`;
  return null;
};

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (!calloutNames.has(node.name) && !explanationNames.has(node.name)) return;

      const attributes = node.attributes || {};
      const data = node.data || (node.data = {});
      const hProperties = data.hProperties || (data.hProperties = {});
      const tone = attributes.tone || attributes.color;
      const sidebarWidth = sidebarWidthFor(attributes);
      const hasSidebar = sidebarWidth !== "none" && (isTruthyAttribute(attributes.sidebar) || Boolean(sidebarWidth));
      const hasBorder = isTruthyAttribute(attributes.border);
      const isReveal = isTruthyAttribute(attributes.reveal);
      const hasExplanation = node.children?.some(
        (child) => child.type === "containerDirective" && explanationNames.has(child.name),
      );

      data.hName = "div";

      if (calloutNames.has(node.name)) {
        addClass(hProperties, "callout");
        if (tone) {
          hProperties["data-tone"] = tone;
          addClass(hProperties, `callout--${tone}`);
        }
        if (hasSidebar) addClass(hProperties, "callout--sidebar");
        if (sidebarWidth && sidebarWidth !== "none") hProperties.style = `--callout-sidebar-width: ${sidebarWidth}`;
        if (hasBorder) addClass(hProperties, "callout--border");
        if (isReveal) {
          addClass(hProperties, "callout--reveal");
          if (hasExplanation) addClass(hProperties, "callout--has-explanation");
          hProperties.tabIndex = "0";
        }
      }

      if (explanationNames.has(node.name)) {
        addClass(hProperties, "quote-explanation");
      }
    });
  };
}
