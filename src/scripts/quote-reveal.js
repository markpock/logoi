const DURATION = 280;

const ensureButton = (callout) => {
  if (callout.querySelector(":scope > .callout-expand")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "callout-expand";
  btn.setAttribute("aria-label", "Show explanation");
  btn.setAttribute("aria-expanded", "false");
  callout.append(btn);
};

const syncCallout = (callout) => {
  const explanation = callout.querySelector(":scope > .quote-explanation");
  if (!explanation) return;
  const visible =
    callout.classList.contains("is-revealed") || callout.classList.contains("is-pinned");
  explanation.hidden = !visible;
  const btn = callout.querySelector(":scope > .callout-expand");
  if (btn) {
    btn.setAttribute("aria-expanded", String(visible));
    btn.setAttribute("aria-label", visible ? "Hide explanation" : "Show explanation");
  }
};

const finishAnimation = (callout, id, wasRevealing) => {
  if (callout.dataset.animId !== id) return;
  callout.style.transition = "none";
  callout.style.height = "";
  callout.style.overflow = "";
  callout.getBoundingClientRect();
  callout.style.transition = "";
  callout.classList.remove("is-animating");
  delete callout.dataset.animId;

  if (wasRevealing && callout.dataset.hoverEnded && !callout.classList.contains("is-pinned")) {
    delete callout.dataset.hoverEnded;
    setRevealed(callout, false);
  }
};

const setRevealed = (callout, reveal) => {
  ensureButton(callout);

  if (callout.classList.contains("is-revealed") === reveal) {
    syncCallout(callout);
    return;
  }

  const startHeight = callout.getBoundingClientRect().height;

  callout.style.transition = "none";
  callout.style.height = `${startHeight}px`;
  callout.style.overflow = "hidden";
  callout.getBoundingClientRect();

  callout.classList.toggle("is-revealed", reveal);
  syncCallout(callout);

  callout.style.height = "";
  const targetHeight = callout.scrollHeight;
  callout.style.height = `${startHeight}px`;

  callout.getBoundingClientRect();
  callout.style.transition = "";

  callout.classList.add("is-animating");
  const id = String(Date.now() + Math.random());
  callout.dataset.animId = id;

  requestAnimationFrame(() => {
    if (callout.dataset.animId !== id) return;
    callout.style.height = `${targetHeight}px`;
  });

  setTimeout(() => finishAnimation(callout, id, reveal), DURATION + 40);
};

const initCallouts = () => {
  document.querySelectorAll(".callout.callout--has-explanation").forEach((callout) => {
    ensureButton(callout);
    syncCallout(callout);
  });
};

if (!window.__quoteRevealBound) {
  window.__quoteRevealBound = true;

  // Click: toggle pin on callout body or caret button
  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".callout-expand");
    if (btn) {
      const callout = btn.closest(".callout.callout--has-explanation");
      if (!callout) return;
      e.preventDefault();
      e.stopPropagation();
      const willPin = !callout.classList.contains("is-pinned");
      callout.classList.toggle("is-pinned", willPin);
      delete callout.dataset.hoverEnded;
      setRevealed(callout, willPin);
      return;
    }

    const callout = e.target.closest?.(".callout.callout--has-explanation");
    if (!callout) {
      document.querySelectorAll(".callout.callout--has-explanation.is-pinned").forEach((c) => {
        c.classList.remove("is-pinned");
        delete c.dataset.hoverEnded;
        setRevealed(c, false);
      });
      return;
    }

    const willPin = !callout.classList.contains("is-pinned");
    callout.classList.toggle("is-pinned", willPin);
    delete callout.dataset.hoverEnded;
    setRevealed(callout, willPin);
  });

  // Caret hover: reveal fully, then hide after animation completes
  document.addEventListener("mouseover", (e) => {
    const btn = e.target.closest?.(".callout-expand");
    if (!btn) return;
    const callout = btn.closest(".callout.callout--has-explanation");
    if (!callout || callout.classList.contains("is-pinned")) return;
    delete callout.dataset.hoverEnded;
    setRevealed(callout, true);
  });

  document.addEventListener("mouseout", (e) => {
    const btn = e.target.closest?.(".callout-expand");
    if (!btn || btn.contains(e.relatedTarget)) return;
    const callout = btn.closest(".callout.callout--has-explanation");
    if (!callout || callout.classList.contains("is-pinned")) return;
    if (callout.dataset.animId) {
      // Still animating — let it finish, then hide
      callout.dataset.hoverEnded = "1";
    } else {
      setRevealed(callout, false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".callout.callout--has-explanation.is-pinned").forEach((c) => {
      c.classList.remove("is-pinned");
      setRevealed(c, false);
    });
  });
}

document.addEventListener("astro:page-load", initCallouts);
initCallouts();
