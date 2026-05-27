import { visit } from "unist-util-visit";

const calloutNames = new Set(["callout", "quote-callout"]);
const lineQuoteNames = new Set(["line-quote", "side-quote"]);
const explanationNames = new Set(["quote-explanation", "callout-explanation"]);

const addClass = (attributes, className) => {
  const current = attributes.class || "";
  attributes.class = [current, className].filter(Boolean).join(" ");
};

const isTruthyAttribute = (value) =>
  value === true || value === "" || value === "true" || value === "yes" || value === "left";

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (!calloutNames.has(node.name) && !lineQuoteNames.has(node.name) && !explanationNames.has(node.name)) return;

      const attributes = node.attributes || {};
      const data = node.data || (node.data = {});
      const hProperties = data.hProperties || (data.hProperties = {});
      const tone = attributes.tone || attributes.color;
      const hasSidebar = isTruthyAttribute(attributes.sidebar);
      const hasBorder = isTruthyAttribute(attributes.border);
      const isReveal = isTruthyAttribute(attributes.reveal);
      const hasExplanation = node.children?.some(
        (child) => child.type === "containerDirective" && explanationNames.has(child.name),
      );

      data.hName = "div";

      if (calloutNames.has(node.name)) {
        addClass(hProperties, "callout");
        addClass(hProperties, "quote-callout");
        if (tone) {
          hProperties["data-tone"] = tone;
          addClass(hProperties, `callout--${tone}`);
        }
        if (hasSidebar) addClass(hProperties, "callout--sidebar");
        if (hasBorder) addClass(hProperties, "callout--border");
        if (isReveal) {
          addClass(hProperties, "callout--reveal");
          if (hasExplanation) addClass(hProperties, "callout--has-explanation");
          hProperties.tabIndex = "0";
        }
      }

      if (lineQuoteNames.has(node.name)) {
        addClass(hProperties, "line-quote");
      }

      if (explanationNames.has(node.name)) {
        addClass(hProperties, "quote-explanation");
      }
    });
  };
}
