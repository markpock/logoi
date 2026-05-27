const syncQuoteReveal = () => {
  document.querySelectorAll(".quote-callout.callout--has-explanation").forEach((callout) => {
    const explanation = callout.querySelector(":scope > .quote-explanation");
    if (!explanation) return;
    explanation.hidden = !callout.classList.contains("is-revealed");
  });
};

if (!window.__quoteRevealBound) {
  window.__quoteRevealBound = true;

  document.addEventListener("mouseover", (event) => {
    const callout = event.target.closest?.(".quote-callout.callout--has-explanation");
    if (!callout) return;
    callout.classList.add("is-revealed");
    syncQuoteReveal();
  });

  document.addEventListener("mouseout", (event) => {
    const callout = event.target.closest?.(".quote-callout.callout--has-explanation");
    if (!callout || callout.contains(event.relatedTarget)) return;
    callout.classList.remove("is-revealed");
    syncQuoteReveal();
  });

  document.addEventListener("focusin", (event) => {
    const callout = event.target.closest?.(".quote-callout.callout--has-explanation");
    if (!callout) return;
    callout.classList.add("is-revealed");
    syncQuoteReveal();
  });

  document.addEventListener("focusout", (event) => {
    const callout = event.target.closest?.(".quote-callout.callout--has-explanation");
    if (!callout || callout.contains(event.relatedTarget)) return;
    callout.classList.remove("is-revealed");
    syncQuoteReveal();
  });
}

document.addEventListener("astro:page-load", syncQuoteReveal);
syncQuoteReveal();
